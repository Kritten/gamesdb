<template>
  {{ useCollection.countItems.value }} Spiele
  <table>
    <list-item-game
      v-for="game in useCollection.items.value"
      :key="game.id"
      :game="game"
    />
  </table>
  <button
    v-if="useCollection.hasNextPage.value"
    @click="useCollection.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { ServiceGame } from '@/modules/game/game.service';
import ListItemGame from '@/modules/game/list/list-item-game.vue';

export default {
  name: 'ListGames',
  components: { ListItemGame },
  setup() {
    const useCollection = ServiceGame.useCollection();

    return {
      useCollection,
    };
  },
};
</script>

<style scoped></style>
