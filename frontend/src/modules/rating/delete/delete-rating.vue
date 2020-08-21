<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script>
import { ServiceRating } from '@/modules/rating/rating.service';
import { useI18n } from 'vue-i18n';
import { Rating } from '@/modules/rating/rating.model';

export default {
  name: 'DeleteRating',
  props: {
    rating: {
      required: true,
      type: Rating,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deleteRating = ServiceRating.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Bewertung '${context.rating.name}' löschen?`);

      if (confirmed) {
        deleteRating.delete(context.rating);
      }
    };

    return {
      t,
      deleteRating,
      confirmDelete,
    };
  },
};
</script>

<style scoped>

</style>
