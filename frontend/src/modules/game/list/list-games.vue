<template>
  <list-filters-game
    v-model="filters"
    @reset="resetFilters"
    @update-filter="updateFilter"
  />
  <hr>
  {{ collection.countItems.value }} {{ t('game.label', collection.countItems.value) }}
  <table>
    <list-item-game
      v-for="game in collection.items.value"
      :key="game.id"
      :game="game"
    />
  </table>
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
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Game } from '@/modules/game/game.model';
import { useI18n } from 'vue-i18n';
import { queue } from '@/queue';
import { defineComponent, ref, nextTick } from 'vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { InputCollectionFilter } from '@backend/src/utilities/collection/collection.input';
import { cloneDeep } from 'lodash';

export default defineComponent({
  name: 'ListGames',
  components: { ListItemGame, ListFiltersGame },
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

    const collection = useCollection<Game>(ServiceGame.loadPage, { filters }, { watchFilters: false });

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

    const updateFilter = ({ name, filter }: { name: string; filter: InputCollectionFilter }) => {
      filters.value[name] = filter;
      collection.resetDebounced();
    };

    return {
      t,
      collection,
      filters,
      resetFilters,
      updateFilter,
    };
  },
});
</script>

<style scoped></style>
