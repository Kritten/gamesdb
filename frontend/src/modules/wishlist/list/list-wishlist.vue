<template>
    <div class="row q-col-gutter-md">
        <div class="col-12">
            <list-wishlist-filters
                v-model="filtersProcessed"
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
            <div class="row q-col-gutter-lg">
                <slot
                    name="items"
                    :wishlistItems="collection.items.value"
                >
                    <list-wishlist-item
                        v-for="(wishlist, index) in collection.items.value"
                        :key="wishlist.id"
                        v-intersection.once="
                            collection.items.value.length - index === 10 &&
                            onIntersection
                        "
                        :wishlist="wishlist"
                    />
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { cloneDeep } from 'lodash';
import ListWishlistItem from '@/modules/wishlist/list/list-wishlist-item.vue';
import BaseListSort from '@/modules/app/base/base-list-sort.vue';
import ListWishlistFilters from '@/modules/wishlist/list/list-wishlist-filters.vue';
import {
    ServiceCollectionFilters,
    InputCollectionFilter,
} from '@/modules/app/utilities/collection/collection.types';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { queue } from '@/queue';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import { Wishlist } from '@/modules/wishlist/wishlist.model';

export default defineComponent({
    name: 'ListWishlist',
    components: {
        ListWishlistFilters,
        BaseListSort,
        ListWishlistItem,
    },
    props: {
        filters: {
            required: false,
            type: Function as PropType<
                (filters: ServiceCollectionFilters) => ServiceCollectionFilters
            >,
            default: (filters: ServiceCollectionFilters) => filters,
        },
    },
    setup(props) {
        const { t } = useI18n();

        const filtersInitial: ServiceCollectionFilters = props.filters({
            'entity.giftFor': {
                field: 'entity.giftFor',
                valueInt: -1,
                operator: '=',
            },
            'entity.price': {
                field: 'entity.price',
                valueRange: [0, 100],
                operator: 'between',
            },
        });

        const filtersProcessed = ref<ServiceCollectionFilters>(
            cloneDeep(filtersInitial)
        );

        const optionsSortBy: { field: string; name: string }[] = [
            { field: 'entity.name', name: 'name' },
        ];

        const sortBy = ref<string[]>(['entity.name']);
        const sortDesc = ref<boolean[]>([false]);

        const collection = useCollection<Wishlist>(ServiceWishlist.loadPage, {
            inputCollectionData: {
                // sortBy: ref(['entity.id']),
                sortBy,
                sortDesc,
                filters: filtersProcessed,
            },
            // todo: was macht das hier?
            watchFilters: false,
        });

        // eslint-disable-next-line no-restricted-syntax
        for (const event of [
            'createdWishlistItem',
            'updatedWishlistItem',
            'deletedWishlistItem',
        ]) {
            queue.listen(event, () => void collection.reset());
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
            filtersProcessed.value = cloneDeep(filtersInitial);

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
            filtersProcessed.value = Object.assign(
                filtersProcessed.value,
                data
            );
            // TODO: send type of filter, and decide if resetDebounce or reset
            collection.resetDebounced();
        };

        return {
            t,
            filtersProcessed,
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
