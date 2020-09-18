<template>
  <button
    :disabled="collectionStatisticsPlaytimesPerDay.isLoading.value === true"
    @click="collectionStatisticsPlaytimesPerDay.loadNextItems"
  >
    Mehr laden
  </button>
  <div
    v-for="day in collectionStatisticsPlaytimesPerDay.items.value"
    :key="day.date"
  >
    <div
      style="float:left"
      class="box"
      :title="day.date"
      :style="{
        backgroundColor: calculateBackgroundColor(day.seconds),
      }"
    />
  </div>
  <div
    style="clear: both"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

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

    const collectionStatisticsPlaytimesPerDay = useCollection(
      ServiceStatistics.loadPageStatisticsPlaytimesPerDay,
      {
        filters,
        leftJoins: ['game|session.gameId = game.id'],
      },
      {
        payload: {
          endInitial: new Date(),
          analogOnly: props.analogOnly,
          digitalOnly: props.digitalOnly,
        },
        prependValues: true,
      },
    );

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
    };
  },
});
</script>

<style scoped>
.box {
  height: 15px;
  width: 15px;
  margin: 2px;
  border: 1px solid black
}
</style>
