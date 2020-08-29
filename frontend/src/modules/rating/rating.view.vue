<template>
  <list-ratings />
</template>

<script lang="ts">
import ListRatings from '@/modules/rating/list/list-ratings.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewRating',
  components: { ListRatings },
});
</script>

<style scoped></style>
