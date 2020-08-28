<template>
  <form @submit.prevent="createRating.create">
    <item-rating
      v-model:rating="createRating.entity.value.rating"
      v-model:player="createRating.entity.value.player"
      v-model:game="createRating.entity.value.game"
    />
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ServiceRating } from '@/modules/rating/rating.service';
import { useI18n } from 'vue-i18n';
import ItemRating from '@/modules/rating/item-rating';

export default {
  name: 'CreateRating',
  components: { ItemRating },
  setup() {
    const { t } = useI18n();
    const createRating = ServiceRating.useCreate();

    return {
      t,
      createRating,
    };
  },
};
</script>

<style scoped>

</style>
