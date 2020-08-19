<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script>
import { ServiceMechanism } from '@/modules/mechanism/mechanism.service';
import { useI18n } from 'vue-i18n';
import { Mechanism } from '@/modules/mechanism/mechanism.model';

export default {
  name: 'DeleteMechanism',
  props: {
    mechanism: {
      required: true,
      type: Mechanism,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deleteMechanism = ServiceMechanism.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Mechanismus '${context.mechanism.name}' löschen?`);

      if (confirmed) {
        deleteMechanism.delete(context.mechanism);
      }
    };

    return {
      t,
      deleteMechanism,
      confirmDelete,
    };
  },
};
</script>

<style scoped>

</style>
