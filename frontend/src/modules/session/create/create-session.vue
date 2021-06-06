<template>
  <base-dialog
    :title="`${t('session.label')} ${t('common.create')}`"
    :options-button="{
      label: `${t('session.label')} ${t('common.create')}`,
    }"
    :validation="vuelidateCreate"
    @submit="submit"
  >
    <item-session
      v-model:game="createSession.entity.value.game"
      v-model:comment="createSession.entity.value.comment"
      v-model:is-challenge="createSession.entity.value.isChallenge"
      v-model:players="createSession.entity.value.players"
      v-model:winners="createSession.entity.value.winners"
      v-model:playtimes="createSession.entity.value.playtimes"
      :validation="vuelidateCreate"
      :hide-game="game !== undefined"
    />

    <template #buttons="{ close }">
      <q-btn
        :label="t('session.start')"
        color="secondary"
        @click="start(close)"
      />
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceSession } from '@/modules/session/session.service';
import { Game } from '@/modules/game/game.model';
import ItemSession from '@/modules/session/item-session.vue';
import {
  computed, defineComponent,
} from 'vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

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

    const vuelidateCreate = useVuelidate(computed(() => ({
      game: {
        required,
      },
      players: {
        required,
      },
      playtimes: {
        required,
      },
    })), createSession.entity);

    const vuelidateStart = useVuelidate(computed(() => ({
      game: {
        required,
      },
    })), createSession.entity);

    return {
      t,
      createSession,
      useTrackSession,
      vuelidateCreate,
      async submit(close: () => void) {
        await createSession.create(props.game);
        close();
      },
      async start(close: () => void) {
        vuelidateCreate.value.$reset();

        const result = await vuelidateStart.value.$validate();

        if (result) {
          await useTrackSession.start(createSession.entity, props.game);
          close();
        } else {
          vuelidateCreate.value.game.$touch();
        }
      },
    };
  },
});
</script>

<style scoped>

</style>
