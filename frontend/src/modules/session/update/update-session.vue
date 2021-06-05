<template>
  <base-dialog
    :title="`${t('session.label')} ${t('common.edit')}`"
    :options-button="{
      label: `${t('session.label')} ${t('common.edit')}`,
    }"
    @submit="updateSession.update"
  >
    <item-session
      v-model:game="updateSession.entity.value.game"
      v-model:comment="updateSession.entity.value.comment"
      v-model:is-challenge="updateSession.entity.value.isChallenge"
      v-model:players="updateSession.entity.value.players"
      v-model:winners="updateSession.entity.value.winners"
      v-model:playtimes="updateSession.entity.value.playtimes"
    />
  </base-dialog>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { Session } from '@/modules/session/session.model';
import ItemSession from '@/modules/session/item-session.vue';
import { ServiceSession } from '@/modules/session/session.service';
import { defineComponent } from 'vue';
import { isEqual } from 'date-fns';
import BaseDialog from '@/modules/app/base/base-dialog';

export default defineComponent({
  name: 'UpdateSession',
  components: {
    BaseDialog, ItemSession,
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

    return {
      t,
      updateSession,
      isEqual,
    };
  },
});
</script>

<style scoped>

</style>
