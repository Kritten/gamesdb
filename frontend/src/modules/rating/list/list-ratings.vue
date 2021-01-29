<template>
  <details>
    <summary>
      {{ t('rating.label') }} anlegen
    </summary>
    <create-rating />
  </details>
  <list-filters-rating
    v-model="filters"
    @reset="resetFilters"
    @update-filter="updateFilter"
  />
  <hr>
  <base-list-sort
    v-model:sort-by="sortBy"
    v-model:sort-desc="sortDesc"
    :options-sort-by="optionsSortBy"
  />
  <h2>
    {{ collection.countItems.value }} {{ t('rating.label', collection.countItems.value) }}
  </h2>
  <table>
    <tr>
      <th>{{ t('rating.label') }}</th>
      <th>{{ t('player.label') }}</th>
      <th>{{ t('game.label') }}</th>
    </tr>
    <list-item-rating
      v-for="rating in collection.items.value"
      :key="rating.id"
      :rating="rating"
    />
  </table>
  <button
    v-if="collection.hasNextPage.value"
    @click="collection.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import CreateRating from '@/modules/rating/create/create-rating.vue';
import ListItemRating from '@/modules/rating/list/list-item-rating.vue';
import ListFiltersRating from '@/modules/rating/list/list-filters-rating.vue';
import BaseListSort from '@/modules/app/base/base-list-sort.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { useI18n } from 'vue-i18n';
import { Rating } from '@/modules/rating/rating.model';
import { ServiceRating } from '@/modules/rating/rating.service';
import { queue } from '@/queue';
import { ServiceCollectionFilters, InputCollectionFilter } from '@/modules/app/utilities/collection/collection.types';
import { cloneDeep } from 'lodash';

export default defineComponent({
  name: 'ListRatings',
  components: {
    ListItemRating, CreateRating, ListFiltersRating, BaseListSort,
  },
  setup() {
    const { t } = useI18n();
    const filters = ref<ServiceCollectionFilters>({});

    const optionsSortBy = [
      { field: 'relation:game.name', name: 'game' },
      { field: 'relation:player.name', name: 'player' },
    ];

    const filtersInitial: ServiceCollectionFilters = {};

    const sortBy = ref<string[]>([optionsSortBy[0].field]);
    const sortDesc = ref<boolean[]>([false]);

    const collection = useCollection<Rating>(ServiceRating.loadPage, {
      inputCollectionData: {
      // sortBy: ref(['entity.id']),
        sortBy,
        sortDesc,
        filters,
      },
      // todo: was macht das hier?
      watchFilters: false,
    });

    for (const event of ['createdRating', 'updatedRating', 'deletedRating']) {
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
