<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script lang="ts">
import { ServiceUniverse } from '@/modules/universe/universe.service';
import { useI18n } from 'vue-i18n';
import { Universe } from '@/modules/universe/universe.model';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteUniverse',
  props: {
    universe: {
      required: true,
      type: Universe,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deleteUniverse = ServiceUniverse.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Universum '${context.universe.name}' löschen?`);

      if (confirmed) {
        deleteUniverse.delete(context.universe);
      }
    };

    return {
      t,
      deleteUniverse,
      confirmDelete,
    };
  },
});
</script>

<style scoped>

</style>
