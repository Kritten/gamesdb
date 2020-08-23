<template>
  <tr>
    <td>
      <router-link :to="{name: 'game', params: {id: game.id}}">
        {{ game.name }}
      </router-link>
    </td>
    <!--    <td>-->
    <!--      <delete-game :game="game" />-->
    <!--    </td>-->
    <!--    <td>-->
    <!--      <update-game :game="game" />-->
    <!--    </td>-->
  </tr>
</template>

<script>
import { Game } from '@/modules/game/game.model';

export default {
  name: 'ListItemGame',
  props: {
    game: {
      required: true,
      type: Game,
    },
  },
};
</script>

<style scoped>

</style>
