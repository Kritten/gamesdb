<template>
  <create-category />
  <table>
    <list-item-category
      v-for="category in categories"
      :key="category.id"
      :category="category"
    />
  </table>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CreateCategory from '@/modules/category/create/create-category';
import ListItemCategory from '@/modules/category/list/list-item-category';

export default {
  name: 'ListCategories',
  components: { ListItemCategory, CreateCategory },
  setup() {
    const store = useStore();

    const categories = computed(() => (store.state.moduleCategory.categories === null ? [] : store.state.moduleCategory.categories));

    return {
      categories,
    };
  },
};
</script>

<style scoped></style>
