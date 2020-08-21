<template>
  <form @submit.prevent="createRating.create">
    <div>
      <label for="name">{{ t('rating.label') }}</label>
      <input
        id="name"
        v-model="createRating.rating.value.name"
      >
    </div>
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

export default {
  name: 'CreateRating',
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
