<template>
  <form @submit.prevent="updateImage.update">
    <div>
      <label for="name">{{ t('image.label') }}</label>
      <input
        id="name"
        v-model="updateImage.entity.value.name"
      >
      <input
        id="link"
        v-model="updateImage.entity.value.link"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ServiceImage } from '@/modules/image/image.service';
import { useI18n } from 'vue-i18n';
import { Image } from '@/modules/image/image.model';

export default {
  name: 'UpdateImage',
  props: {
    image: {
      required: true,
      type: Image,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updateImage = ServiceImage.useUpdate(context.image);

    return {
      t,
      updateImage,
    };
  },
};
</script>

<style scoped>

</style>
