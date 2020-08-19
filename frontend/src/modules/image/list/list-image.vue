<template>
  <create-image />
  <table>
    <list-item-image
      v-for="image in images"
      :key="image.id"
      :image="image"
    />
  </table>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CreateImage from '@/modules/image/create/create-image';
import ListItemImage from '@/modules/image/list/list-item-image';

export default {
  name: 'ListImages',
  components: { ListItemImage, CreateImage },
  setup() {
    const store = useStore();

    const images = computed(() => (store.state.moduleImage.images === null ? [] : store.state.moduleImage.images));

    return {
      images,
    };
  },
};
</script>

<style scoped></style>
