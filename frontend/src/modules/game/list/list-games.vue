<template>
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
    @click="collection.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { ServiceGame } from '@/modules/game/game.service';
import ListItemGame from '@/modules/game/list/list-item-game.vue';
import { useStore } from 'vuex';
import { useCollection } from '@/modules/app/utilities/collection';
import { Game } from '@/modules/game/game.model';
import { useI18n } from 'vue-i18n';

export default {
  name: 'ListGames',
  components: { ListItemGame },
  setup() {
    const { t } = useI18n();
    const collection = useCollection(Game, ServiceGame);

    return {
      t,
      collection,
      store: useStore(),
    };
  },
};
</script>

<style scoped></style>
