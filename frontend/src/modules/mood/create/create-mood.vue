<template>
  <form @submit.prevent="createMood.create">
    <div>
      <label for="name">{{ t('mood.label') }}</label>
      <input
        id="name"
        v-model="createMood.mood.value.name"
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
import { ServiceMood } from '@/modules/mood/mood.service';
import { useI18n } from 'vue-i18n';

export default {
  name: 'CreateMood',
  setup() {
    const { t } = useI18n();
    const createMood = ServiceMood.useCreate();

    return {
      t,
      createMood,
    };
  },
};
</script>

<style scoped>

</style>
