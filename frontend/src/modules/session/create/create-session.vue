<template>
  <form @submit.prevent="createSession.create">
    <item-session
      v-model:comment="createSession.entity.value.comment"
      v-model:is-challenge="createSession.entity.value.isChallenge"
      v-model:players="createSession.entity.value.players"
      v-model:winners="createSession.entity.value.winners"
    />
    <div>
      <p>{{ t('playtime.label', 2) }}</p>
      <item-playtime
        v-model:start="createSession.playtimeNew.value.start"
        v-model:end="createSession.playtimeNew.value.end"
      />
      <div>
        <button
          type="button"
          @click="createSession.playtimeAdd"
        >
          {{ t('playtime.label') }} {{ t('common.create') }}
        </button>
      </div>
      <div
        v-for="(playtime, index) in createSession.entity.value.playtimes"
        :key="index"
      >
        <display-playtime
          :start="playtime.start"
          :end="playtime.end"
        />
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

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceSession } from '@/modules/session/session.service';
import { useStore } from 'vuex';
import { Game } from '@/modules/game/game.model';
import ItemSession from '@/modules/session/item-session.vue';
import ItemPlaytime from '@/modules/playtime/item-playtime.vue';
import DisplayPlaytime from '@/modules/playtime/display-playtime.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateSession',
  components: {
    ItemPlaytime, ItemSession, DisplayPlaytime,
  },
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
});
</script>

<style scoped>

</style>
