<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <list-filters-game
        v-model="filters"
        @reset="resetFilters"
        @update-filter="updateFilter"
      >
        <div class="text-h6">
          {{ t('filter.label', 2) }}

          (<span v-if="collection.isLoading.value === false">{{ collection.countItems.value }}</span><base-spinner
            v-else
            class="inline"
            size="xs"
          />/{{ countTotalAnalog }})

          <!--              {{ collection.countItems.value }} {{ t('game.label', collection.countItems.value) }}-->
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

      <div
        class="row q-col-gutter-lg"
      >
        <list-item-game
          v-for="(game, index) in collection.items.value"
          :key="game.id"
          v-intersection.once="collection.items.value.length - index === 10 && onIntersection"
          :game="game"
        />
      </div>
      <base-spinner v-if="collection.isLoading.value" />
    </div>
  </div>
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
import { useGames } from '@/modules/game/composables/useGames';
import BaseSpinner from '@/modules/app/base/base-spinner.vue';

export default defineComponent({
  name: 'ListGames',
  components: {
    BaseSpinner,
    RandomGame,
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
  },
  setup(props) {
    const { t } = useI18n();
    const { countTotalAnalog } = useGames();

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
      { field: 'entity.name', name: t('game.name') },
      { field: 'entity.description', name: t('game.description') },
      { field: 'entity.countPlayersMin', name: t('game.countPlayersMin') },
      { field: 'entity.countPlayersMax', name: t('game.countPlayersMax') },
      { field: 'entity.minutesPlaytimeMin', name: t('game.minutesPlaytimeMin') },
      { field: 'entity.minutesPlaytimeMax', name: t('game.minutesPlaytimeMax') },
      { field: 'entity.size', name: t('game.size') },
      { field: 'entity.complexity', name: t('game.complexity') },
      { field: 'entity.isCoop', name: t('game.isCoop') },
      { field: 'rating:rating', name: t('rating.label') },
      { field: 'countPlayed:countPlayed', name: t('game.countPlayed') },
      { field: 'timePlayed:timePlayed', name: t('game.timePlayed') },
    ];

    return {
      t,
      countTotalAnalog,
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
