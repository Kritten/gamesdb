<template>
  {{ createSession.session.value }}
  <form @submit.prevent="createSession.create">
    <div>
      <label for="players">{{ t('player.label', 2) }}</label>
      <select
        id="players"
        v-model="createSession.session.value.players"
        multiple
      >
        <option
          v-for="player in store.state.modulePlayer.players"
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
        v-model="createSession.session.value.winners"
        multiple
      >
        <option
          v-for="winner in store.state.modulePlayer.players"
          :key="winner.id"
          :value="winner.id"
        >
          {{ winner.name }}
        </option>
      </select>
    </div>
    <div>
      <p>{{ t('playtime.label', 2) }}</p>
      {{ createSession.playtimeNew.value }}
      <div>
        <label>{{ t('playtime.start') }}</label>
        <datetime-picker v-model="createSession.playtimeNew.value.start" />
      </div>
      <div>
        <label>{{ t('playtime.end') }}</label>
        <datetime-picker v-model="createSession.playtimeNew.value.end" />
      </div>
      <div>
        <button
          type="button"
          @click="createSession.playtimeAdd"
        >
          {{ t('playtime.label') }} {{ t('common.create') }}
        </button>
      </div>
      <div v-for="playtime in createSession.session.value.playtimes">
        <span>{{ playtime.start }} - {{ playtime.end }}</span>
        <button
          type="button"
          @click="createSession.playtimeRemove(playtime)"
        >
          {{ t('playtime.label') }} {{ t('common.delete') }}
        </button>
      </div>
    </div>
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ServiceSession } from '@/modules/session/session.service';
import { useStore } from 'vuex';
import DatetimePicker from '@/modules/app/base/datetime-picker';
import { Game } from '@/modules/game/game.model';

export default {
  name: 'CreateSession',
  components: { DatetimePicker },
  props: {
    game: {
      type: Game,
      required: true,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const store = useStore();
    const createSession = ServiceSession.useCreate(context.game);

    return {
      t,
      store,
      createSession,
    };
  },
};
</script>

<style scoped>

</style>
