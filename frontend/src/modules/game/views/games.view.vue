<template>
  <h1>Spiel anlegen</h1>
  <create-game />
  <h1>Spiele</h1>
  <list-games />
</template>

<script>
import ListGames from '@/modules/game/list/list-games';
import CreateGame from '@/modules/game/create/create-game';

export default {
  name: 'ViewGames',
  components: { CreateGame, ListGames },
};
</script>

<style scoped></style>
