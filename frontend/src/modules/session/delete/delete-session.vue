<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ServiceSession } from '@/modules/session/session.service';
import { Session } from '@/modules/session/session.model';

export default {
  name: 'DeleteSession',
  props: {
    session: {
      required: true,
      type: Session,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deleteSession = ServiceSession.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm('Session löschen?');

      if (confirmed) {
        deleteSession.delete(context.session);
      }
    };

    return {
      t,
      confirmDelete,
    };
  },
};
</script>

<style scoped>

</style>
