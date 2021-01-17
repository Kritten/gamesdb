<template>
  <hr>
  <div>
    <img
      v-for="image in wishlistItem.images"
      :key="image.id"
      :src="image.link"
      style="width: 100px"
    >

    <div>
      {{ wishlistItem.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';

export default defineComponent({
  name: 'ListWishlistItemExtern',
  props: {
    wishlistItem: {
      required: true,
      type: Wishlist,
    },
  },
});
</script>

<style scoped>

</style>
