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

<script>
import DeleteCategory from '@/modules/category/delete/delete-category';
import { Category } from '@/modules/category/category.model';
import UpdateCategory from '@/modules/category/update/update-category';

export default {
  name: 'ListItemCategory',
  components: { UpdateCategory, DeleteCategory },
  props: {
    category: {
      required: true,
      type: Category,
    },
  },
};
</script>

<style scoped>

</style>
