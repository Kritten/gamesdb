<template>
  <div>
    <label for="isChallenge">{{ t('session.isChallenge') }}</label>
    <input
      id="isChallenge"
      v-model="isChallengeInternal"
      type="checkbox"
    >
  </div>
  <div>
    <label for="comment">{{ t('session.comment') }}</label>
    <textarea
      id="comment"
      v-model="commentInternal"
    />
  </div>
  <div>
    <label for="players">{{ t('player.label', 2) }}</label>
    <select
      id="players"
      v-model="playersInternal"
      multiple
    >
      <option
        v-for="player in store.getters['modulePlayer/playersSortedByLastPlayed']"
        :key="player.id"
        :value="player.id"
      >
        {{ player.name }}
      </option>
    </select>
  </div>
  <div>
    <label for="winners">{{ t('winner.label', 2) }}</label>
    <select
      id="winners"
      v-model="winnersInternal"
      multiple
    >
      <option
        v-for="winner in store.getters['modulePlayer/playersSortedByLastPlayed']"
        :key="winner.id"
        :value="winner.id"
      >
        {{ winner.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemSession',
  props: {
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
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();

    return {
      t,
      store,
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
