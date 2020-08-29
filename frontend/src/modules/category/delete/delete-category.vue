<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script lang="ts">
import { ServiceCategory } from '@/modules/category/category.service';
import { useI18n } from 'vue-i18n';
import { Category } from '@/modules/category/category.model';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteCategory',
  props: {
    category: {
      required: true,
      type: Category,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const deleteCategory = ServiceCategory.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Kategorie '${props.category.name}' löschen?`);

      if (confirmed) {
        deleteCategory.delete(props.category);
      }
    };

    return {
      t,
      deleteCategory,
      confirmDelete,
    };
  },
});
</script>

<style scoped>

</style>
