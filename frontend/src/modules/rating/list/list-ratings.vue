<template>
  <create-rating />
  <h2>Ratings</h2>
  <table>
    <tr>
      <th>{{t('rating.label')}}</th>
      <th>{{t('player.label')}}</th>
      <th>{{t('game.label')}}</th>
    </tr>
    <list-item-rating
      v-for="rating in collection.items.value"
      :key="rating.id"
      :rating="rating"
    />
  </table>
</template>

<script lang="ts">
import { ref } from 'vue';
import CreateRating from '@/modules/rating/create/create-rating';
import ListItemRating from '@/modules/rating/list/list-item-rating';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { useI18n } from 'vue-i18n';
import { Rating } from '@/modules/rating/rating.model';
import { ServiceRating } from '@/modules/rating/rating.service';
import { queue } from '@/queue';

export default {
  name: 'ListRatings',
  components: { ListItemRating, CreateRating },
  setup() {
    const { t } = useI18n();
    const filters = ref([]);
    const collection = useCollection<Rating>(ServiceRating, { sortBy: 'id', filters: filters.value });

    for (const event of ['createdRating', 'updatedRating', 'deletedRating']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    return {
      t,
      filters,
      collection,
    };
  },
};
</script>

<style scoped></style>
