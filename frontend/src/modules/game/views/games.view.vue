<template>
  <h1>Spiel anlegen</h1>
  <create-game />
  <h1>Spiele</h1>
  <list-games />
</template>

<script lang="ts">
import ListGames from '@/modules/game/list/list-games.vue';
import CreateGame from '@/modules/game/create/create-game.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewGames',
  components: { CreateGame, ListGames },
});
</script>

<style scoped></style>
