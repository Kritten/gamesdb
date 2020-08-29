<template>
  {{ collection.countItems.value }} {{ t('image.label', collection.countItems.value) }}
  <create-image />
  <table>
    <list-item-image
      v-for="image in collection.items.value"
      :key="image.id"
      :image="image"
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
import CreateImage from '@/modules/image/create/create-image.vue';
import ListItemImage from '@/modules/image/list/list-item-image.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Image } from '@/modules/image/image.model';
import { ServiceImage } from '@/modules/image/image.service';
import { useI18n } from 'vue-i18n';
import { queue } from '@/queue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListImages',
  components: { ListItemImage, CreateImage },
  setup() {
    const { t } = useI18n();
    const collection = useCollection<Image>(ServiceImage);

    for (const event of ['createdImage', 'updatedImage', 'deletedImage']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    return {
      t,
      collection,
    };
  },
});
</script>

<style scoped></style>
