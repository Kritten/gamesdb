<template>
  <list-universes />
</template>

<script lang="ts">
import ListUniverses from '@/modules/universe/list/list-universe.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewGame',
  components: { ListUniverses },
});
</script>

<style scoped></style>
