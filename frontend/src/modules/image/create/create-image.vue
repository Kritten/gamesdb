<template>
  <form @submit.prevent="createImage.create">
    <div>
      <label for="name">{{ t('image.label') }}</label>
      <input
        id="name"
        v-model="createImage.entity.value.name"
      >
      <input
        id="link"
        v-model="createImage.entity.value.link"
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
import { ServiceImage } from '@/modules/image/image.service';
import { useI18n } from 'vue-i18n';

export default {
  name: 'CreateImage',
  setup() {
    const { t } = useI18n();
    const createImage = ServiceImage.useCreate();

    return {
      t,
      createImage,
    };
  },
};
</script>

<style scoped>

</style>
