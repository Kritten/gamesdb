<template>
  <tr>
    <td>
      <router-link :to="{name: 'wishlist-item', params: {id: wishlist.id}}">
        {{ wishlist.name }}
      </router-link>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';

export default defineComponent({
  name: 'ListWishlistItem',
  props: {
    wishlist: {
      required: true,
      type: Wishlist,
    },
  },
});
</script>

<style scoped>

</style>
