<template>
  <input-select-game
    v-if="hideGame === false"
    v-model="gameInternal"
    :validation="validation.game"
  />

  <base-input-boolean
    v-model="isChallengeInternal"
    :options="{
      label: t('session.isChallenge')
    }"
  />

  <base-input-text
    v-model="commentInternal"
    :validation="validation.comment"
    :options="{
      label: t('session.comment'),
      autogrow: true,
    }"
  />

  <input-select-player
    v-model="playersInternal"
    :validation="validation.players"
  />

  <input-select-player
    v-model="winnersInternal"
    :validation="validation.winners"
    :options="{
      label: t('winner.label', 2),
      options: playersInternal,
      useInput: false,
      disable: playersInternal.length === 0,
    }"
  />

  <q-markup-table>
    <thead>
      <tr>
        <th class="text-left">
          {{ t('playtime.label') }}
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(playtime, index) in playtimes"
        :key="index"
      >
        <td>
          <item-playtime
            :start="playtime.start"
            :end="playtime.end"
          />
        </td>
        <td>
          <q-btn
            flat
            color="negative"
            :label="`${t('playtime.label')} ${t('common.delete')}`"
            @click="playtimeRemove(playtime)"
          />
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>
          <item-playtime
            :start="playtimeNew.start"
            :end="playtimeNew.end"
          />
        </td>
        <td
          class="text-right"
          style="width: 1px;"
        >
          <q-btn
            flat
            :label="`${t('playtime.label')} ${t('common.create')}`"
            @click="playtimeAdd"
          />
        </td>
      </tr>
    </tfoot>
  </q-markup-table>
  <div
    v-if="errorMessagePlaytimes !== ''"
    class="text-negative q-mt-sm error-playtimes"
  >
    {{ errorMessagePlaytimes }}
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { translate, useModelWrapper } from '@/modules/app/utilities/helpers';
import { computed, defineComponent, PropType } from 'vue';
import { Game } from '@/modules/game/game.model';
import InputSelectGame from '@/modules/game/base/input-select-game.vue';
import InputSelectPlayer from '@/modules/player/base/input-select-player.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import ItemPlaytime from '@/modules/playtime/item-playtime.vue';
import { usePlaytime } from '@/modules/playtime/composables/usePlaytime';
import { Playtime } from '@/modules/playtime/playtime.model';
import { Player } from '@/modules/player/player.model';
import { Validation } from '@vuelidate/core';

export default defineComponent({
  name: 'ItemSession',
  components: {
    ItemPlaytime,
    BaseInputText,
    BaseInputBoolean,
    InputSelectPlayer,
    InputSelectGame,
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
    playtimes: {
      type: Array,
      required: true,
    },
    hideGame: {
      type: Boolean,
      required: false,
      default: false,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const playtimesInternal = useModelWrapper<Array<Playtime>>({
      props, emit, name: 'playtimes',
    });

    const { playtimeNew, playtimeAdd, playtimeRemove } = usePlaytime(playtimesInternal);

    return {
      t,
      gameInternal: useModelWrapper<Game>({
        props, emit, name: 'game',
      }),
      playersInternal: useModelWrapper<Array<Player>>({
        props, emit, name: 'players', isEntity: true,
      }),
      winnersInternal: useModelWrapper<Array<Player>>({
        props, emit, name: 'winners', isEntity: true,
      }),
      commentInternal: useModelWrapper<string>({
        props, emit, name: 'comment',
      }),
      isChallengeInternal: useModelWrapper<boolean>({
        props, emit, name: 'isChallenge',
      }),
      playtimesInternal,
      playtimeNew,
      playtimeAdd,
      playtimeRemove,
      errorMessagePlaytimes: computed(() => {
        if ((props as {validation: Validation}).validation.playtimes.$errors.length > 0) {
          return translate((props as {validation: Validation}).validation.playtimes.$errors[0], t).$message;
        }
        return '';
      }),
    };
  },
});
</script>

<style scoped>
  tfoot tr td {
    border-top-width: 3px;
  }

  .error-playtimes {
    font-size: 11px;
  }
</style>
