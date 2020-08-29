<template>
  <list-players />
</template>

<script lang="ts">
import ListPlayers from '@/modules/player/list/list-player.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewPlayer',
  components: { ListPlayers },
});
</script>

<style scoped></style>
