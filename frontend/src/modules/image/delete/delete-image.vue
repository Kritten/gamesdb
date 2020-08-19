<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script>
import { ServiceImage } from '@/modules/image/image.service';
import { useI18n } from 'vue-i18n';
import { Image } from '@/modules/image/image.model';

export default {
  name: 'DeleteImage',
  props: {
    image: {
      required: true,
      type: Image,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deleteImage = ServiceImage.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Bild '${context.image.name}' löschen?`);

      if (confirmed) {
        deleteImage.delete(context.image);
      }
    };

    return {
      t,
      deleteImage,
      confirmDelete,
    };
  },
};
</script>

<style scoped>

</style>
