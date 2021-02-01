<template>
  <list-wishlist-filters
    v-model="filters"
    @reset="resetFilters"
    @update-filter="updateFilter"
  />
<!--  <base-list-sort-->
<!--    v-model:sort-by="sortBy"-->
<!--    v-model:sort-desc="sortDesc"-->
<!--    :options-sort-by="optionsSortBy"-->
<!--  />-->
  <h2>{{ collection.countItems.value }} {{ t('wishlist.item.label', collection.countItems.value) }}</h2>
  <slot
    name="items"
    :wishlistItems="collection.items.value"
  >
    <table>
      <tr>
        <th>{{ t('wishlist.item.label') }}</th>
      </tr>
      <list-wishlist-item
        v-for="wishlist in collection.items.value"
        :key="wishlist.id"
        :wishlist="wishlist"
      />
    </table>
  </slot>
  <button
    v-if="collection.hasNextPage.value"
    @click="collection.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import {
  defineComponent, nextTick, PropType, ref,
} from 'vue';
import ListWishlistItem from '@/modules/wishlist/list/list-wishlist-item.vue';
import BaseListSort from '@/modules/app/base/base-list-sort.vue';
import ListWishlistFilters from '@/modules/wishlist/list/list-wishlist-filters.vue';
import { useI18n } from 'vue-i18n';
import { ServiceCollectionFilters, InputCollectionFilter } from '@/modules/app/utilities/collection/collection.types';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { queue } from '@/queue';
import { cloneDeep } from 'lodash';
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
      type: Function as PropType<(filters: ServiceCollectionFilters) => ServiceCollectionFilters>,
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

    const filters = ref<ServiceCollectionFilters>(cloneDeep(filtersInitial));

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
        filters,
      },
      // todo: was macht das hier?
      watchFilters: false,
    });

    for (const event of ['createdWishlist', 'updatedWishlist', 'deletedWishlist']) {
      queue.listen(event, () => {
        collection.reset();
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

      collection.reset();

      await resetDebounced();
    };

    /**
     * prevent initial fetch
     */
    resetDebounced();

    const updateFilter = (data: { name: string; filter: InputCollectionFilter }) => {
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
    };
  },
});
</script>

<style scoped></style>
