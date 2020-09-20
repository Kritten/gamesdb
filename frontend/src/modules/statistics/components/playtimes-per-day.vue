<template>
  <div class="wrapper-playtimes-per-day">
    <div class="labels-day">
      <div>Montag</div>
      <div />
      <div>Mittwoch</div>
      <div />
      <div>Freitag</div>
      <div />
      <div>Sonntag</div>
    </div>
    <div>
      <div class="labels-month">
        <span
          v-for="label in labelsMonth"
          :key="label.day.date"
          style="position: absolute"
          :style="{left: `${label.index * 21}px`}"
        >{{ label.monthFormatted }}</span>
      </div>
      <div class="boxes">
        <div
          v-for="(week, index) in weeks"
          :key="week[0].date"
          :class="{firstWeek: index === 0}"
        >
          <template
            v-for="day in week"
            :key="day.date"
          >
            <div
              class="box"
              :title="day.date"
              :style="{
                backgroundColor: calculateBackgroundColor(day.seconds),
              }"
              :class="{'first-of-month': day.isFirstDayOfMonth === true}"
            />
          </template>
        </div>
      </div>
    </div>
  </div>

  <div class="controls">
    <button
      v-if="collectionStatisticsPlaytimesPerDay.hasNextPage.value === true"
      :disabled="collectionStatisticsPlaytimesPerDay.isLoading.value === true"
      @click="collectionStatisticsPlaytimesPerDay.loadNextItems"
    >
      Mehr laden
    </button>
    <div class="legend">
      <div>Weniger</div>
      <div
        v-for="color in ratioMapping"
        :key="color"
        class="box"
        :style="{
          backgroundColor: color,
        }"
      />
      <div>Mehr</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import {
  format,
  getDaysInMonth, isAfter, isMonday, parse, parseISO, startOfMonth, subMonths,
} from 'date-fns';
import { chunk } from 'lodash';

export default defineComponent({
  name: 'PlaytimesPerDay',
  props: {
    analogOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
    digitalOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const filters = ref<ServiceCollectionFilters>({});

    if (props.analogOnly || props.digitalOnly) {
      filters.value.isDigital = {
        field: 'game.isDigital',
        valueBoolean: props.digitalOnly,
        operator: '=',
      };
    }

    const endInitial = new Date();
    const startOfDataCollection = props.digitalOnly ? parseISO('2020-07-01') : parseISO('2020-06-01');

    const collectionStatisticsPlaytimesPerDay = useCollection(
      ServiceStatistics.loadPageStatisticsPlaytimesPerDay,
      {
        inputCollectionData: {
          filters,
          leftJoins: ['game|session.gameId = game.id'],
        },
        payload: {
          endInitial,
          analogOnly: props.analogOnly,
          digitalOnly: props.digitalOnly,
        },
        prependValues: true,
        // has next page until 2020-06-01 is reached (start of data collection)
        hasNextPage: ({ page }) => isAfter(
          startOfMonth(subMonths(endInitial, page.value)),
          startOfDataCollection,
        ),
      },
    );

    const weeks = computed(() => {
      const days = collectionStatisticsPlaytimesPerDay.items.value;

      if (days.length === 0) {
        return [];
      }

      let numberOfDays = 0;
      while (numberOfDays < days.length) {
        // @ts-ignore
        days[numberOfDays].isFirstDayOfMonth = true;
        numberOfDays += getDaysInMonth(parse(days[numberOfDays].date, 'yyyy-MM-dd HH:mm:ss', 0));
      }

      let indexStartOfWeek = 0;
      while (indexStartOfWeek < days.length) {
        const day = days[indexStartOfWeek];
        const date = parse(day.date, 'yyyy-MM-dd HH:mm:ss', 0);
        if (isMonday(date)) {
          break;
        }

        indexStartOfWeek += 1;
      }

      const itemsPreMonday = days.slice(0, indexStartOfWeek);
      const items = days.slice(indexStartOfWeek);

      const itemsChunked = chunk(items, 7);

      if (itemsPreMonday.length > 0) {
        return [itemsPreMonday].concat(itemsChunked);
      }
      return itemsChunked;
    });

    const labelsMonth = computed(() => {
      const result = [];

      for (let i = 0; i < weeks.value.length; i += 1) {
        const week = weeks.value[i];
        // @ts-ignore
        const weekDay = week.find((day) => day.isFirstDayOfMonth === true);
        if (weekDay !== undefined) {
          result.push({
            index: i,
            day: weekDay,
            monthFormatted: format(parse(weekDay.date, 'yyyy-MM-dd HH:mm:ss', 0), 'MMM'),
          });
        }
      }

      return result;
    });

    const ratioMapping = ['#ffffff', '#ced9cc', '#9eb49a', '#70906c', '#436d3f', '#104c15'];

    const calculateBackgroundColor = (seconds: number) => {
      const ratio = seconds / 86400;

      const foo = [0, 0.041, 0.125, 0.2, 0.3333333];

      if (ratio > 0) {
        if (ratio < 0.041) {
          return ratioMapping[1];
        }
        if (ratio < 0.125) {
          return ratioMapping[2];
        }
        if (ratio < 0.2) {
          return ratioMapping[3];
        }
        if (ratio < 0.3333333) {
          return ratioMapping[4];
        }
        return ratioMapping[5];
      }
      return ratioMapping[0];
    };

    return {
      collectionStatisticsPlaytimesPerDay,
      calculateBackgroundColor,
      weeks,
      labelsMonth,
      ratioMapping,
    };
  },
});
</script>

<style lang="scss" scoped>
$dimension-box: 15px;
$margin-box: 2px;
$border-box: 1px;
$computed-height: $dimension-box + $margin-box + 2 * $border-box;

.wrapper-playtimes-per-day {
  display: flex;

  .labels-day {
    margin-top: $computed-height + 10px;

    div {
      height: $computed-height;
    }
  }

  .labels-month {
    position: relative;
    height: $computed-height + 10px;
  }

  .boxes {
    display: flex;
  }

  .firstWeek {
    align-self: flex-end;
  }
}

.box {
  height: $dimension-box;
  width: $dimension-box;
  margin: $margin-box;
  border: $border-box solid rgba(0,0,0, 0.2);

  &.first-of-month {
    border-color: black;
  }
}

.controls {
  display: flex;
  margin-top: 10px;
  min-height: 22px;

  button {
    padding: 2px 6px;
    margin: 0;
  }

  .legend {
    margin-left: 10px;
    display: flex;
    align-items: center;
    font-size: 0.75rem;

    .box {
      height: $dimension-box * 0.5;
      width: $dimension-box * 0.5;
    }
  }
}
</style>
