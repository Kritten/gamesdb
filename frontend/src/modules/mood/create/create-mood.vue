<template>
  <form @submit.prevent="createMood.create">
    <div>
      <label for="name">{{ t('mood.label') }}</label>
      <input
        id="name"
        v-model="createMood.entity.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { ServiceMood } from '@/modules/mood/mood.service';
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateMood',
  setup() {
    const { t } = useI18n();
    const createMood = ServiceMood.useCreate();

    return {
      t,
      createMood,
    };
  },
});
</script>

<style scoped>

</style>
