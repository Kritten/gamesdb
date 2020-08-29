<template>
  <list-moods />
</template>

<script lang="ts">
import ListMoods from '@/modules/mood/list/list-mood.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewGame',
  components: { ListMoods },
});
</script>

<style scoped></style>
