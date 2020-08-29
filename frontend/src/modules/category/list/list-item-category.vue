<template>
  <tr>
    <td>
      {{ category.name }}
    </td>
    <td>
      <delete-category :category="category" />
    </td>
    <td>
      <update-category :category="category" />
    </td>
  </tr>
</template>

<script lang="ts">
import DeleteCategory from '@/modules/category/delete/delete-category.vue';
import { Category } from '@/modules/category/category.model';
import UpdateCategory from '@/modules/category/update/update-category.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItemCategory',
  components: { UpdateCategory, DeleteCategory },
  props: {
    category: {
      required: true,
      type: Category,
    },
  },
});
</script>

<style scoped>

</style>
