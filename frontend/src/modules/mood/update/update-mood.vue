<template>
  <form @submit.prevent="updateMood.update">
    <div>
      <label for="name">{{ t('mood.label') }}</label>
      <input
        id="name"
        v-model="updateMood.entity.value.name"
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
import { ServiceMood } from '@/modules/mood/mood.service';
import { useI18n } from 'vue-i18n';
import { Mood } from '@/modules/mood/mood.model';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UpdateMood',
  props: {
    mood: {
      required: true,
      type: Mood,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updateMood = ServiceMood.useUpdate(context.mood);

    return {
      t,
      updateMood,
    };
  },
});
</script>

<style scoped>

</style>
