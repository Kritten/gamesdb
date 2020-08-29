<template>
  <list-images />
</template>

<script lang="ts">
import ListImages from '@/modules/image/list/list-images.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewGame',
  components: { ListImages },
});
</script>

<style scoped></style>
