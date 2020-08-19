<template>
  <tr>
    <td>
      {{ image.name }}
    </td>
    <td>
      <img
        :src="image.link"
        style="width: 50px; height: auto"
      >
    </td>
    <td>
      <delete-image :image="image" />
    </td>
    <td>
      <update-image :image="image" />
    </td>
  </tr>
</template>

<script>
import DeleteImage from '@/modules/image/delete/delete-image';
import { Image } from '@/modules/image/image.model';
import UpdateImage from '@/modules/image/update/update-image';

export default {
  name: 'ListItemImage',
  components: { UpdateImage, DeleteImage },
  props: {
    image: {
      required: true,
      type: Image,
    },
  },
};
</script>

<style scoped>

</style>
