<template>
    <div class="row">
        <div class="col-shrink q-mr-sm labels-day">
            <div class="text-center">
                <q-btn
                    v-if="
                        collectionStatisticsPlaytimesPerDay.hasNextPage
                            .value === true
                    "
                    icon="fas fa-arrow-left"
                    flat
                    round
                    size="xs"
                    color="primary"
                    :disabled="
                        collectionStatisticsPlaytimesPerDay.isLoading.value ===
                        true
                    "
                    @click="collectionStatisticsPlaytimesPerDay.loadNextItems"
                />
            </div>
            <div>Montag</div>
            <div />
            <div>Mittwoch</div>
            <div />
            <div>Freitag</div>
            <div />
            <div>Sonntag</div>
        </div>

        <div class="col">
            <q-scroll-area style="height: 12rem">
                <div class="row">
                    <div class="col labels-month">
                        <span
                            v-for="label in labelsMonth"
                            :key="label.day.date"
                            style="position: absolute"
                            :style="{ left: `${label.index * 1.6}rem` }"
                            >{{ label.monthFormatted }}</span
                        >
                    </div>
                </div>

                <div class="row">
                    <div class="col boxes">
                        <div
                            v-for="(week, index) in weeks"
                            :key="week[0].date"
                            :class="{ firstWeek: index === 0 }"
                        >
                            <template
                                v-for="day in week"
                                :key="day.date"
                            >
                                <div
                                    class="box"
                                    :style="{
                                        backgroundColor:
                                            calculateBackgroundColor(
                                                day.seconds
                                            ),
                                    }"
                                    :class="{
                                        'first-of-month':
                                            day.isFirstDayOfMonth === true,
                                    }"
                                >
                                    <q-tooltip>
                                        {{ day.date }}
                                    </q-tooltip>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </q-scroll-area>
        </div>
    </div>

    <div class="row justify-end">
        <div class="col-shrink">
            <div class="legend">
                <div class="q-mr-xs">Weniger</div>
                <div
                    v-for="color in ratioMapping"
                    :key="color"
                    class="box"
                    :style="{
                        backgroundColor: color,
                    }"
                />
                <div class="q-ml-xs">Mehr</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
    format,
    getDaysInMonth,
    isAfter,
    isMonday,
    parse,
    parseISO,
    startOfMonth,
    subMonths,
} from 'date-fns';
import { chunk } from 'lodash';
import { de } from 'date-fns/locale';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';

export default defineComponent({
    name: 'PlaytimesPerDay',
    components: { BaseDateTime },
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
        const startOfDataCollection = props.digitalOnly
            ? parseISO('2020-07-01')
            : parseISO('2020-06-01');

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
                hasNextPage: ({ page }) =>
                    isAfter(
                        startOfMonth(subMonths(endInitial, page.value)),
                        startOfDataCollection
                    ),
            }
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
                numberOfDays += getDaysInMonth(
                    parse(days[numberOfDays].date, 'yyyy-MM-dd HH:mm:ss', 0)
                );
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
                const weekDay = week.find(
                    (day) => day.isFirstDayOfMonth === true
                );
                if (weekDay !== undefined) {
                    result.push({
                        index: i,
                        day: weekDay,
                        monthFormatted: format(
                            parse(weekDay.date, 'yyyy-MM-dd HH:mm:ss', 0),
                            'MMMM',
                            { locale: de }
                        ),
                    });
                }
            }

            return result;
        });

        const ratioMapping = [
            '#ffffff',
            '#ced9cc',
            '#9eb49a',
            '#70906c',
            '#436d3f',
            '#104c15',
        ];

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

<style
    lang="scss"
    scoped
>
$dimension-box: 1.2rem;
$margin-box: 0.2rem;
$border-box: 1px;
$computed-height: $dimension-box + $margin-box;

.labels-day {
    //margin-top: $computed-height + 10px;

    div {
        height: $computed-height;
    }

    div:first-of-type {
        height: unset;
    }
}

.labels-month {
    position: relative;
    height: $computed-height;
}

.boxes {
    display: flex;
}

.firstWeek {
    align-self: flex-end;
}

.box {
    height: $dimension-box;
    width: $dimension-box;
    margin: $margin-box;
    border: $border-box solid rgba(0, 0, 0, 0.2);

    &.first-of-month {
        border-color: black;
    }
}

.legend {
    display: flex;
    align-items: center;
    font-size: 0.8rem;

    .box {
        height: $dimension-box * 0.7;
        width: $dimension-box * 0.7;
    }
}
</style>
