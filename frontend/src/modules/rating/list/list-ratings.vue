<template>
  <create-rating />
  <h2>
    {{ collection.countItems.value }} {{ t('rating.label', collection.countItems.value) }}
  </h2>
  <table>
    <tr>
      <th>{{ t('rating.label') }}</th>
      <th>{{ t('player.label') }}</th>
      <th>{{ t('game.label') }}</th>
    </tr>
    <list-item-rating
      v-for="rating in collection.items.value"
      :key="rating.id"
      :rating="rating"
    />
  </table>
  <button
    v-if="collection.hasNextPage.value"
    @click="collection.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CreateRating from '@/modules/rating/create/create-rating.vue';
import ListItemRating from '@/modules/rating/list/list-item-rating.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { useI18n } from 'vue-i18n';
import { Rating } from '@/modules/rating/rating.model';
import { ServiceRating } from '@/modules/rating/rating.service';
import { queue } from '@/queue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
  name: 'ListRatings',
  components: { ListItemRating, CreateRating },
  setup() {
    const { t } = useI18n();
    const filters = ref<ServiceCollectionFilters>({});
    const collection = useCollection<Rating>(ServiceRating.loadPage, { inputCollectionData: { sortBy: 'entity.id', filters } });

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
});
</script>

<style scoped></style>
