<template>
  <base-dialog
    :title="`${t('session.label')} ${t('common.edit')}`"
    :text-submit="t('common.edit')"
    :options-button="{
      label: `${t('session.label')} ${t('common.edit')}`,
    }"
    :validation="vuelidate"
    @submit="submit"
  >
    <template #activator="{ open }">
      <q-btn
        icon="fas fa-edit"
        color="primary"
        flat
        round
        @click="open"
      >
        <q-tooltip class="text-capitalize">
          {{ t('common.edit') }}
        </q-tooltip>
      </q-btn>
    </template>

    <item-session
      v-model:game="updateSession.entity.value.game"
      v-model:comment="updateSession.entity.value.comment"
      v-model:is-challenge="updateSession.entity.value.isChallenge"
      v-model:players="updateSession.entity.value.players"
      v-model:winners="updateSession.entity.value.winners"
      v-model:playtimes="updateSession.entity.value.playtimes"
      :validation="vuelidate"
    />
  </base-dialog>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { Session } from '@/modules/session/session.model';
import ItemSession from '@/modules/session/item-session.vue';
import { ServiceSession } from '@/modules/session/session.service';
import { computed, defineComponent } from 'vue';
import { isEqual } from 'date-fns';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default defineComponent({
  name: 'UpdateSession',
  components: {
    BaseDialog,
    ItemSession,
  },
  props: {
    session: {
      required: true,
      type: Session,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const updateSession = ServiceSession.useUpdate(props.session);

    const vuelidate = useVuelidate(computed(() => ({
      game: {
        required,
      },
    })), updateSession.entity);

    return {
      t,
      updateSession,
      vuelidate,
      isEqual,
      async submit(close: () => void) {
        await updateSession.update();
        close();
      },
    };
  },
});
</script>

<style scoped>

</style>
