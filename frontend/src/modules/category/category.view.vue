<template>
  <list-categories />
</template>

<script lang="ts">
import ListCategories from '@/modules/category/list/list-category.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewGame',
  components: { ListCategories },
});
</script>

<style scoped></style>
