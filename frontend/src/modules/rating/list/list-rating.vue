<template>
  <create-rating />
  <table>
    <list-item-rating
      v-for="rating in ratings"
      :key="rating.id"
      :rating="rating"
    />
  </table>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CreateRating from '@/modules/rating/create/create-rating';
import ListItemRating from '@/modules/rating/list/list-item-rating';

export default {
  name: 'ListRatings',
  components: { ListItemRating, CreateRating },
  setup() {
    const store = useStore();

    const ratings = computed(() => (store.state.moduleRating.ratings === null ? [] : store.state.moduleRating.ratings));

    return {
      ratings,
    };
  },
};
</script>

<style scoped></style>
