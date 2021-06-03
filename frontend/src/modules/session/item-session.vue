<template>
  {{ gameInternal }}
  <input-select-game
    v-if="hideGame === false"
    v-model="gameInternal"
  />
  <base-input-boolean
    v-model="isChallengeInternal"
    :options="{
      label: t('session.isChallenge')
    }"
  />
  <base-input-text
    v-model="commentInternal"
    :options="{
      label: t('session.comment'),
      autogrow: true,
    }"
  />
  <input-select-player v-model="playersInternal" />
  <input-select-player
    v-model="winnersInternal"
    :options="{
      label: t('winner.label', 2),
      options: playersInternal,
      useInput: false,
      disable: playersInternal.length === 0,
    }"
  />
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { defineComponent } from 'vue';
import { Game } from '@/modules/game/game.model';
import InputSelectGame from '@/modules/game/base/input-select-game.vue';
import InputSelectPlayer from '@/modules/player/base/input-select-player.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';

export default defineComponent({
  name: 'ItemSession',
  components: {
    BaseInputText, BaseInputBoolean, InputSelectPlayer, InputSelectGame,
  },
  props: {
    game: {
      type: Game,
      required: false,
      default: undefined,
    },
    comment: {
      validator: (value) => typeof value === 'string' || value === null,
      required: true,
    },
    isChallenge: {
      type: Boolean,
      required: true,
    },
    players: {
      type: Array,
      required: true,
    },
    winners: {
      type: Array,
      required: true,
    },
    hideGame: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    return {
      t,
      gameInternal: useModelWrapper({
        props, emit, name: 'game',
      }),
      playersInternal: useModelWrapper({
        props, emit, name: 'players', isEntity: true,
      }),
      winnersInternal: useModelWrapper({
        props, emit, name: 'winners', isEntity: true,
      }),
      commentInternal: useModelWrapper({
        props, emit, name: 'comment',
      }),
      isChallengeInternal: useModelWrapper({
        props, emit, name: 'isChallenge',
      }),
    };
  },
});
</script>

<style scoped>

</style>
