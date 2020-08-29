<template>
  <form @submit.prevent="createCategory.create">
    <div>
      <label for="name">{{ t('category.label') }}</label>
      <input
        id="name"
        v-model="createCategory.entity.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { ServiceCategory } from '@/modules/category/category.service';
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateCategory',
  setup() {
    const { t } = useI18n();
    const createCategory = ServiceCategory.useCreate();

    return {
      t,
      createCategory,
    };
  },
});
</script>

<style scoped>

</style>
