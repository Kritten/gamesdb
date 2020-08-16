<template>
  <div
    v-for="game in games"
    :key="game.name"
  >
    {{ game.name }}
  </div>
</template>

<script>
export default {
  name: 'ListGames',
  setup() {
    const games = [{
      name: 'Game1',
    }];

    return {
      games,
    };
  },
};
</script>

<style scoped></style>
