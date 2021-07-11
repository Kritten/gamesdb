<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <input-select-player
        v-model="playerInternal"
        :validation="validation?.player"
      />
    </div>

    <div class="col-12">
      <input-select-game
        v-model="gameInternal"
        :validation="validation?.game"
      />
    </div>

    <div class="col-12">
      <input-select-rating
        v-model="ratingInternal"
        :validation="validation?.rating"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, PropType } from 'vue';
import InputSelectRating from '@/modules/game/base/input-select-rating.vue';
import InputSelectGame from '@/modules/game/base/input-select-game.vue';
import InputSelectPlayer from '@/modules/player/base/input-select-player.vue';
import { Validation } from '@vuelidate/core';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';
import { useModelWrapper } from '../app/utilities/helpers';

export default defineComponent({
  name: 'ItemRating',
  components: { InputSelectPlayer, InputSelectGame, InputSelectRating },
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
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    return {
      t,
      ratingInternal: useModelWrapper({
        props, emit, name: 'rating',
      }),
      gameInternal: useModelWrapper({
        props, emit, name: 'game',
      }),
      playerInternal: useModelWrapper({
        props, emit, name: 'player',
      }),
    };
  },
});
</script>

<style scoped>

</style>
