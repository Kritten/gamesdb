<template>
  <form @submit.prevent="createSession.create">
    <item-session
      v-model:players="createSession.entity.value.players"
      v-model:winners="createSession.entity.value.winners"
    />
    <div>
      <p>{{ t('playtime.label', 2) }}</p>
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
      <div v-for="playtime in createSession.entity.value.playtimes">
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
import ItemSession from '@/modules/session/item-session';

export default {
  name: 'CreateSession',
  components: { ItemSession, DatetimePicker },
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
