<template>
    <div class="row q-col-gutter-md">
        <div class="col-12">
            <list-filters-game
                v-model="filters"
                @reset="resetFiltersInternal"
                @update-filter="updateFilter"
            >
                <div class="text-h6">
                    {{ t('filter.label', 2) }}

                    (<span v-if="collection.isLoading.value === false">{{
                        collection.countItems.value
                    }}</span
                    ><base-spinner v-else class="inline" size="xs" />/{{
                        countTotal
                    }})

                    <!-- {{ collection.countItems.value }}
                    {{ t('game.label', collection.countItems.value) }} -->
                </div>
            </list-filters-game>
        </div>
        <div class="col-12">
            <base-list-sort
                v-model:sort-by="sortBy"
                v-model:sort-desc="sortDesc"
                :options-sort-by="optionsSortBy"
            />
        </div>
        <div class="col-12">
            <!--  <random-game :filters="filters" />-->

            <div class="row q-col-gutter-lg">
                <list-item-game
                    v-for="(game, index) in collection.items.value"
                    :key="game.id"
                    v-intersection.once="
                        collection.items.value.length - index === 10 &&
                        onIntersection
                    "
                    :game="game"
                    :reduced="reduced"
                />
            </div>
            <base-spinner v-if="collection.isLoading.value" />
        </div>
    </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, ref, nextTick, computed } from 'vue';
import { cloneDeep } from 'lodash';
import { ServiceGame } from '@/modules/game/game.service';
import ListItemGame from '@/modules/game/list/list-item-game.vue';
import ListFiltersGame from '@/modules/game/list/list-filters-game.vue';
import BaseListSort from '@/modules/app/base/base-list-sort.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { queue } from '@/queue';
import {
    ServiceCollectionFilters,
    InputCollectionFilter,
} from '@/modules/app/utilities/collection/collection.types';
// import RandomGame from '@/modules/game/random-game.vue';
import { useGame } from '@/modules/game/composables/useGame';
import BaseSpinner from '@/modules/app/base/base-spinner.vue';
import { GameLoading } from '@/modules/game/game.types';
import { useFilters } from '@/modules/app/composables/useFilters';
import { useSort } from '@/modules/app/composables/useSort';

export default defineComponent({
    name: 'ListGames',
    components: {
        BaseSpinner,
        // RandomGame,
        ListItemGame,
        ListFiltersGame,
        BaseListSort,
    },
    props: {
        digitalOnly: {
            type: Boolean,
            required: false,
            default: false,
        },
        analogOnly: {
            type: Boolean,
            required: false,
            default: false,
        },
        reduced: {
            required: false,
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { t } = useI18n();
        const { countTotalAnalog, countTotalDigital } = useGame();

        const filtersInitial: ServiceCollectionFilters = {
            isDigital: {
                field: 'entity.isDigital',
                valueBoolean: props.digitalOnly,
                operator: '=',
            },
            'universe.id': {
                field: 'universe.id',
                valueEntity: [],
                operator: '=',
            },
            'mood.id': {
                field: 'mood.id',
                valueEntity: [],
                operator: '=',
            },
            'category.id': {
                field: 'category.id',
                valueEntity: [],
                operator: '=',
            },
            'mechanism.id': {
                field: 'mechanism.id',
                valueEntity: [],
                operator: '=',
            },
        };

        const { getFilters, resetFilters } = useFilters({
            key: `list-games-${
                props.digitalOnly ? 'digital' : props.analogOnly ? 'analog' : ''
            }`,
            initial: filtersInitial,
        });

        const { getSort } = useSort({
            key: `list-games-${
                props.digitalOnly ? 'digital' : props.analogOnly ? 'analog' : ''
            }`,
            initial: {
                sortBy: ['entity.name'],
                sortDesc: [false],
            },
        });

        const filters = getFilters();
        const { sortBy, sortDesc } = getSort();

        const collection = useCollection<GameLoading>(ServiceGame.loadPage, {
            inputCollectionData: {
                sortBy,
                sortDesc,
                filters,
                count: 30,
            },
            watchFilters: false,
        });

        // eslint-disable-next-line no-restricted-syntax
        for (const event of ['createdGame', 'updatedGame']) {
            queue.listen(event, () => {
                void collection.reset();
            });
        }

        const resetDebounced = async () => {
            /**
             * wait two ticks so that all debounced methods has started
             */
            await nextTick();
            await nextTick();

            collection.resetDebounced.cancel();
        };

        const resetFiltersInternal = async () => {
            resetFilters();

            void collection.reset();

            await resetDebounced();
        };

        /**
         * prevent initial fetch
         */
        void resetDebounced();

        const updateFilter = (data: {
            name: string;
            filter: InputCollectionFilter;
        }) => {
            filters.value = Object.assign(filters.value, data);
            // TODO: send type of filter, and decide if resetDebounce or reset
            collection.resetDebounced();
        };

        const optionsSortBy = [
            { field: 'entity.name', name: t('game.name') },
            { field: 'entity.description', name: t('game.description') },
            {
                field: 'entity.countPlayersMin',
                name: t('game.countPlayersMin'),
            },
            {
                field: 'entity.countPlayersMax',
                name: t('game.countPlayersMax'),
            },
            {
                field: 'entity.minutesPlaytimeMin',
                name: t('game.minutesPlaytimeMin'),
            },
            {
                field: 'entity.minutesPlaytimeMax',
                name: t('game.minutesPlaytimeMax'),
            },
            { field: 'entity.size', name: t('game.size') },
            { field: 'entity.complexity', name: t('game.complexity') },
            { field: 'ratingAverage', name: t('rating.label') },
            { field: 'lastSession', name: t('game.list.sort.lastSession') },
            // { field: 'countPlayed:countPlayed', name: t('game.countPlayed') },
            // { field: 'timePlayed:timePlayed', name: t('game.timePlayed') },
        ];

        const countTotal = computed(() => {
            let result = 0;

            if (
                countTotalDigital.value === undefined ||
                countTotalAnalog.value === undefined
            ) {
                return result;
            }

            if (!(props.digitalOnly === false && props.analogOnly === true)) {
                result += countTotalDigital.value;
            }
            if (!(props.analogOnly === false && props.digitalOnly === true)) {
                result += countTotalAnalog.value;
            }

            return result;
        });

        return {
            t,
            countTotal,
            collection,
            filters,
            sortBy,
            sortDesc,
            optionsSortBy,
            resetFiltersInternal,
            updateFilter,
            onIntersection(entry: { isIntersecting: boolean }) {
                if (
                    entry.isIntersecting === true &&
                    collection.hasNextPage.value
                ) {
                    void collection.loadNextItems();
                }
            },
        };
    },
});
</script>

<style scoped></style>
