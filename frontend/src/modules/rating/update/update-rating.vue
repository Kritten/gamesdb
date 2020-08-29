<template>
  <form @submit.prevent="updateRating.update">
    <div>
      <label for="name">{{ t('rating.label') }}</label>
      <input
        id="name"
        v-model="updateRating.rating.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { ServiceRating } from '@/modules/rating/rating.service';
import { useI18n } from 'vue-i18n';
import { Rating } from '@/modules/rating/rating.model';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UpdateRating',
  props: {
    rating: {
      required: true,
      type: Rating,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updateRating = ServiceRating.useUpdate(context.rating);

    return {
      t,
      updateRating,
    };
  },
});
</script>

<style scoped>

</style>
