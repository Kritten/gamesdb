<template>
  <tr>
    <td>
      {{ rating.rating }}
    </td>
    <td>
      {{ rating.player.name }}
    </td>
    <td>
      {{ rating.game.name }}
    </td>
    <td>
      <delete-rating :rating="rating" />
    </td>
    <td>
      <!--      <update-rating :rating="rating" />-->
    </td>
  </tr>
</template>

<script lang="ts">
import DeleteRating from '@/modules/rating/delete/delete-rating.vue';
import { Rating } from '@/modules/rating/rating.model';
import UpdateRating from '@/modules/rating/update/update-rating.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItemRating',
  components: { UpdateRating, DeleteRating },
  props: {
    rating: {
      required: true,
      type: Rating,
    },
  },
});
</script>

<style scoped>

</style>
