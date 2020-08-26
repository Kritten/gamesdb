<template>
  <form @submit.prevent="updateCategory.update">
    <div>
      <label for="name">{{ t('category.label') }}</label>
      <input
        id="name"
        v-model="updateCategory.entity.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ServiceCategory } from '@/modules/category/category.service';
import { useI18n } from 'vue-i18n';
import { Category } from '@/modules/category/category.model';

export default {
  name: 'UpdateCategory',
  props: {
    category: {
      required: true,
      type: Category,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updateCategory = ServiceCategory.useUpdate(context.category);

    return {
      t,
      updateCategory,
    };
  },
};
</script>

<style scoped>

</style>
