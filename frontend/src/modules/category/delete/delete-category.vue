<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script>
import { ServiceCategory } from '@/modules/category/category.service';
import { useI18n } from 'vue-i18n';
import { Category } from '@/modules/category/category.model';

export default {
  name: 'DeleteCategory',
  props: {
    category: {
      required: true,
      type: Category,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deleteCategory = ServiceCategory.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Kategorie '${context.category.name}' löschen?`);

      if (confirmed) {
        deleteCategory.delete(context.category);
      }
    };

    return {
      t,
      deleteCategory,
      confirmDelete,
    };
  },
};
</script>

<style scoped>

</style>
