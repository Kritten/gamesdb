<template>
  <!--  <div v-for="filter in filters">-->
  <!--    {{filter}}-->
  <!--  </div>-->
  <list-filters-game
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
  <hr>
  <random-game :filters="filters" />
  <hr>
  {{ collection.countItems.value }} {{ t('game.label', collection.countItems.value) }}
  <div class="row q-col-gutter-lg">
    <list-item-game
      v-for="(game, index) in collection.items.value"
      :key="game.id"
      v-intersection.once="collection.items.value.length - index === 10 && onIntersection"
      :game="game"
    />
  </div>
  <button
    v-if="collection.hasNextPage.value"
    :disabled="collection.isLoading.value === true"
    @click="collection.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { ServiceGame } from '@/modules/game/game.service';
import ListItemGame from '@/modules/game/list/list-item-game.vue';
import ListFiltersGame from '@/modules/game/list/list-filters-game.vue';
import BaseListSort from '@/modules/app/base/base-list-sort.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Game } from '@/modules/game/game.model';
import { useI18n } from 'vue-i18n';
import { queue } from '@/queue';
import { defineComponent, ref, nextTick } from 'vue';
import { ServiceCollectionFilters, InputCollectionFilter } from '@/modules/app/utilities/collection/collection.types';
import { cloneDeep } from 'lodash';
import RandomGame from '@/modules/game/random-game.vue';

export default defineComponent({
  name: 'ListGames',
  components: {
    RandomGame, ListItemGame, ListFiltersGame, BaseListSort,
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
  },
  setup(props) {
    const { t } = useI18n();

    const filtersInitial: ServiceCollectionFilters = {
      isDigital: {
        field: 'isDigital',
        valueBoolean: props.digitalOnly,
        operator: '=',
      },
    };

    const filters = ref<ServiceCollectionFilters>(cloneDeep(filtersInitial));
    const sortBy = ref<string[]>(['entity.name']);
    const sortDesc = ref<boolean[]>([false]);

    const collection = useCollection<Game>(ServiceGame.loadPage, {
      inputCollectionData: {
        sortBy, sortDesc, filters, count: 30,
      },
      watchFilters: false,
    });

    for (const event of ['createdGame', 'updatedGame']) {
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

    const optionsSortBy = [
      { field: 'entity.name', name: 'name' },
      { field: 'entity.description', name: 'description' },
      { field: 'entity.countPlayersMin', name: 'countPlayersMin' },
      { field: 'entity.countPlayersMax', name: 'countPlayersMax' },
      { field: 'entity.minutesPlaytimeMin', name: 'minutesPlaytimeMin' },
      { field: 'entity.minutesPlaytimeMax', name: 'minutesPlaytimeMax' },
      { field: 'entity.size', name: 'size' },
      { field: 'entity.complexity', name: 'complexity' },
      { field: 'entity.isCoop', name: 'isCoop' },
      { field: 'rating:rating', name: 'rating' },
      { field: 'countPlayed:countPlayed', name: 'countPlayed' },
      { field: 'timePlayed:timePlayed', name: 'timePlayed' },
    ];

    return {
      t,
      collection,
      filters,
      sortBy,
      sortDesc,
      optionsSortBy,
      resetFilters,
      updateFilter,
      onIntersection(entry: {isIntersecting: boolean}) {
        if (entry.isIntersecting === true && collection.hasNextPage.value) {
          void collection.loadNextItems();
        }
      },
    };
  },
});
</script>

<style scoped></style>
