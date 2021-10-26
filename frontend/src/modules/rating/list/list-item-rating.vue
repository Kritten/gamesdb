<template>
  <tr>
    <td>
      {{ rating.player.name }}
    </td>
    <td>
      <link-game :game="rating.game" />
    </td>
    <td>
      <display-rating :rating="rating.rating" />
    </td>
    <td>
      <update-rating
        v-if="rating.game !== null"
        :rating="rating"
      />
      <delete-rating :rating="rating" />
    </td>
  </tr>
</template>

<script lang="ts">
import DeleteRating from '@/modules/rating/delete/delete-rating.vue';
import { Rating } from '@/modules/rating/rating.model';
import UpdateRating from '@/modules/rating/update/update-rating.vue';
import { defineComponent } from 'vue';
import DisplayRating from '@/modules/rating/base/display-rating.vue';
import LinkGame from '@/modules/game/base/link-game.vue';

export default defineComponent({
  name: 'ListItemRating',
  components: {
    LinkGame, DisplayRating, UpdateRating, DeleteRating,
  },
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
