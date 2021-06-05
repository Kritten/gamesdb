<template>
  <base-dialog
    :title="`${t('session.label')} ${t('common.create')}`"
    :options-button="{
      label: `${t('session.label')} ${t('common.create')}`,
    }"
    @submit="submit"
  >
    <item-session
      v-model:game="createSession.entity.value.game"
      v-model:comment="createSession.entity.value.comment"
      v-model:is-challenge="createSession.entity.value.isChallenge"
      v-model:players="createSession.entity.value.players"
      v-model:winners="createSession.entity.value.winners"
      v-model:playtimes="createSession.entity.value.playtimes"
      :hide-game="game !== undefined"
    />

    <template #buttons>
      <q-btn
        :label="t('session.start')"
        color="secondary"
        @click="useTrackSession.start(createSession.entity, game)"
      />
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceSession } from '@/modules/session/session.service';
import { Game } from '@/modules/game/game.model';
import ItemSession from '@/modules/session/item-session.vue';
import { defineComponent } from 'vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';

export default defineComponent({
  name: 'CreateSession',
  components: {
    BaseDialog,
    ItemSession,
  },
  props: {
    game: {
      type: Game,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const createSession = ServiceSession.useCreate();
    const useTrackSession = ServiceSession.useTrackSession();
    return {
      t,
      createSession,
      useTrackSession,
      async submit(close: () => void) {
        await createSession.create(props.game);
        close();
      },
    };
  },
});
</script>

<style scoped>

</style>
