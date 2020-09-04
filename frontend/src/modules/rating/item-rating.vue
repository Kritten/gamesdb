<template>
  <div>
    <label for="rating">{{ t('rating.label') }}</label>
    <select
      id="rating"
      v-model="ratingInternal"
    >
      <option
        v-for="ratingLocal in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="ratingLocal"
        :value="ratingLocal"
      >
        {{ ratingLocal }}
      </option>
    </select>
  </div>
  <div>
    <label for="playerInput">{{ t('player.label') }}</label>
    <select
      id="playerInput"
      v-model="playerInternal"
    >
      <option
        v-for="playerLocal in store.state.modulePlayer.players"
        :key="playerLocal.id"
        :value="playerLocal.id"
      >
        {{ playerLocal.name }}
      </option>
    </select>
  </div>
  <div>
    <label for="game">{{ t('game.label', 2) }}</label>
    <input
      id="game"
      v-model="filtersGame[0].valueString"
    >
    <div>
      <div v-for="gameLocal in collectionGame.items.value">
        {{ gameLocal.name }} <button
          type="button"
          @click="$emit('update:game', gameLocal)"
        >
          {{ t('common.select') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useCollection } from '../app/utilities/collection/collection';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';
import { useModelWrapper } from '../app/utilities/helpers';
import { ServiceGame } from '../game/game.service';

export default defineComponent({
  name: 'ItemRating',
  props: {
    rating: {
      validator: (value) => Number.isInteger(value) || value === undefined,
      required: true,
    },
    player: {
      validator: (value) => value instanceof Player || value === undefined,
      required: true,
    },
    game: {
      validator: (value) => value instanceof Game || value === undefined,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();

    const filtersGame = ref([{
      field: 'name', valueString: undefined, operator: 'like',
    }]);
    const collectionGame = useCollection<Game>(ServiceGame.loadPage, { count: 5, filters: filtersGame.value });

    return {
      t,
      store,
      collectionGame,
      filtersGame,
      ratingInternal: useModelWrapper({
        props, emit, name: 'rating',
      }),
      playerInternal: useModelWrapper({
        props, emit, name: 'player', isEntity: true, entities: store.state.modulePlayer.players,
      }),
    };
  },
});
</script>

<style scoped>

</style>
