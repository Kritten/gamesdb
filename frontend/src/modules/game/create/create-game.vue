<template>
  <form @submit.prevent="createGame.create">
    <item-game
      v-model:name="createGame.game.value.name"
      v-model:description="createGame.game.value.description"
      v-model:countPlayersMin="createGame.game.value.countPlayersMin"
      v-model:countPlayersMax="createGame.game.value.countPlayersMax"
      v-model:minutesPlaytimeMin="createGame.game.value.minutesPlaytimeMin"
      v-model:minutesPlaytimeMax="createGame.game.value.minutesPlaytimeMax"
      v-model:isCoop="createGame.game.value.isCoop"
      v-model:complexity="createGame.game.value.complexity"
      v-model:size="createGame.game.value.size"
      v-model:universes="createGame.game.value.universes"
      v-model:categories="createGame.game.value.categories"
      v-model:mechanisms="createGame.game.value.mechanisms"
      v-model:moods="createGame.game.value.moods"
      v-model:images="createGame.game.value.images"
    />
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ServiceGame } from '@/modules/game/game.service';
import { useStore } from 'vuex';
import ItemGame from '@/modules/game/item-game';

export default {
  name: 'CreateGame',
  components: { ItemGame },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const createGame = ServiceGame.useCreate();

    return {
      t,
      store,
      createGame,
    };
  },
};
</script>

<style scoped>

</style>
