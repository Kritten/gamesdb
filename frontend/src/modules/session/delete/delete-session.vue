<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceSession } from '@/modules/session/session.service';
import { Session } from '@/modules/session/session.model';
import { defineComponent } from 'vue';

export default defineComponent({
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
});
</script>

<style scoped>

</style>
