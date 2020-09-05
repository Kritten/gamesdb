<template>
  {{ collection.countItems.value }} {{ t('game.label', collection.countItems.value) }}
  <div>
    <!--    <label for="nameGame">{{ t('game.name') }}</label>-->
    <!--    <input-->
    <!--      id="nameGame"-->
    <!--      v-model="filters.name.valueString"-->
    <!--    >-->
  </div>
  <list-filters-game
    v-model="filters"
    @reset="resetFilters"
    @update-filter="updateFilter"
  />
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

    const filtersInitial: ServiceCollectionFilters = {};

    if (props.digitalOnly) {
      filtersInitial.isDigital = {
        field: 'isDigital',
        valueBoolean: true,
        operator: '=',
      };
    } else if (props.analogOnly) {
      filtersInitial.isDigital = {
        field: 'isDigital',
        valueBoolean: false,
        operator: '=',
      };
    }

    const filters = ref<ServiceCollectionFilters>(cloneDeep(filtersInitial));

    const collection = useCollection<Game>(ServiceGame.loadPage, { filters }, { watchFilters: false });

    for (const event of ['createdGame', 'updatedGame']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    const resetFilters = async () => {
      filters.value = cloneDeep(filtersInitial);

      collection.reset();

      /**
       * wait two ticks so that all debounced methods has started
       */
      await nextTick();
      await nextTick();

      collection.resetDebounced.cancel();
    };

    /**
     * prevent initial fetch
     */
    nextTick()
      .then(() => nextTick())
      .then(() => collection.resetDebounced.cancel());

    const updateFilter = ({ name, filter }: { name: string; filter: InputCollectionFilter }) => {
      console.log(filter.valueString);
      filters.value[name] = filter;
      collection.resetDebounced();
    };

    // watch(
    //   filters,
    //   value => {
    //     console.warn('CALLED WATCH FILTERS, check if used');
    //     resetDebounced();
    //   },
    //   { deep: true },
    // );

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
