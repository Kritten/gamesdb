<template>
  <q-rating
    v-if="rating !== null"
    :model-value="rating / 2.0"
    readonly
    size="1.5rem"
    icon="far fa-star"
    icon-selected="fas fa-star"
    icon-half="fas fa-star-half-alt"
  />
  <span v-else>
    -
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DisplayRating',
  props: {
    rating: {
      required: true,
    },
  },
});
</script>

<style scoped>

</style>
