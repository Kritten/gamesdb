<template>
  <create-game />
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
