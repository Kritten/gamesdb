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

<script lang="ts">
import { Game } from '@/modules/game/game.model';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItemGame',
  props: {
    game: {
      required: true,
      type: Game,
    },
  },
});
</script>

<style scoped>

</style>
