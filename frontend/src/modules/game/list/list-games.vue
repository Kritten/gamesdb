<template>
  {{ filters }}
  {{ collection.countItems.value }} {{ t('game.label', collection.countItems.value) }}
  <input v-model="filters[0].value">
  <table>
    <list-item-game
      v-for="game in collection.items.value"
      :key="game.id"
      :game="game"
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
import { ServiceGame } from '@/modules/game/game.service';
import ListItemGame from '@/modules/game/list/list-item-game.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Game } from '@/modules/game/game.model';
import { useI18n } from 'vue-i18n';
import { queue } from '@/queue';
import { ref } from 'vue';

export default {
  name: 'ListGames',
  components: { ListItemGame },
  setup() {
    const { t } = useI18n();
    const filters = ref([{
      field: 'name', value: null, operator: 'Like',
    }]);
    const collection = useCollection<Game>(ServiceGame, { filters: filters.value });

    for (const event of ['createdGame', 'updatedGame']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    return {
      t,
      collection,
      filters,
    };
  },
};
</script>

<style scoped></style>
