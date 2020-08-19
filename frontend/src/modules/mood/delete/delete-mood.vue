<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script>
import { ServiceMood } from '@/modules/mood/mood.service';
import { useI18n } from 'vue-i18n';
import { Mood } from '@/modules/mood/mood.model';

export default {
  name: 'DeleteMood',
  props: {
    mood: {
      required: true,
      type: Mood,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deleteMood = ServiceMood.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Stimmung '${context.mood.name}' löschen?`);

      if (confirmed) {
        deleteMood.delete(context.mood);
      }
    };

    return {
      t,
      deleteMood,
      confirmDelete,
    };
  },
};
</script>

<style scoped>

</style>
