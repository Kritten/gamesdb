<template>
  <tr>
    <td>
      {{ wishlist.rating }}
    </td>
    <td>
      {{ wishlist.player.name }}
    </td>
    <td>
      {{ wishlist.game.name }}
    </td>
    <td>
      <delete-wishlist :wishlist="wishlist" />
    </td>
    <td>
      <!--      <update-rating :rating="rating" />-->
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListWishlistItem',
});
</script>

<style scoped>

</style>
