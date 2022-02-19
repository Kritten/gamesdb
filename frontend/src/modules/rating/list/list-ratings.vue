<template>
    <div class="row q-col-gutter-md">
        <div class="col-12">
            <list-filters-rating
                v-model="filters"
                @reset="resetFilters"
                @update-filter="updateFilter"
            />
        </div>
        <div class="col-12">
            <base-list-sort
                v-model:sort-by="sortBy"
                v-model:sort-desc="sortDesc"
                :options-sort-by="optionsSortBy"
            />
        </div>
        <div class="col-12">
            <q-markup-table border="1">
                <thead>
                    <tr>
                        <th class="text-left">
                            {{ t('player.label') }}
                        </th>
                        <th class="text-left">
                            {{ t('game.label') }}
                        </th>
                        <th class="text-left">
                            {{ t('rating.label') }}
                        </th>
                        <th style="width: 1px" />
                    </tr>
                </thead>
                <tbody>
                    <list-item-rating
                        v-for="(rating, index) in collection.items.value"
                        :key="rating.id"
                        v-intersection.once="
                            collection.items.value.length - index === 10 &&
                            onIntersection
                        "
                        :rating="rating"
                    />
                </tbody>
            </q-markup-table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { cloneDeep } from 'lodash';
import ListItemRating from '@/modules/rating/list/list-item-rating.vue';
import ListFiltersRating from '@/modules/rating/list/list-filters-rating.vue';
import BaseListSort from '@/modules/app/base/base-list-sort.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Rating } from '@/modules/rating/rating.model';
import { ServiceRating } from '@/modules/rating/rating.service';
import { queue } from '@/queue';
import {
    ServiceCollectionFilters,
    InputCollectionFilter,
} from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
    name: 'ListRatings',
    components: {
        ListItemRating,
        ListFiltersRating,
        BaseListSort,
    },
    setup() {
        const { t } = useI18n();
        const filters = ref<ServiceCollectionFilters>({});

        const optionsSortBy = [
            { field: 'game.name', name: 'game' },
            { field: 'player.name', name: 'player' },
        ];

        const filtersInitial: ServiceCollectionFilters = {};

        const sortBy = ref<string[]>([optionsSortBy[0].field]);
        const sortDesc = ref<boolean[]>([false]);

        const collection = useCollection<Rating>(ServiceRating.loadPage, {
            inputCollectionData: {
                count: 30,
                // sortBy: ref(['entity.id']),
                sortBy,
                sortDesc,
                filters,
            },
            // todo: was macht das hier?
            watchFilters: false,
        });

        // eslint-disable-next-line no-restricted-syntax
        for (const event of [
            'createdRating',
            'updatedRating',
            'deletedRating',
        ]) {
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

        const resetFilters = async () => {
            filters.value = cloneDeep(filtersInitial);

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

        return {
            t,
            filters,
            collection,
            sortBy,
            sortDesc,
            optionsSortBy,
            resetFilters,
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
