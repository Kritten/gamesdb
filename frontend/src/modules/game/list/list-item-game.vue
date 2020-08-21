<template>
  <tr>
    <td>
      {{ game.name }}
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
import { ref } from 'vue';
import { Game } from '@/modules/game/game.model';

export default {
  name: 'ListItemGame',
  props: {
    game: {
      required: true,
      type: Game,
    },
  },
  setup() {
    const openDialog = ref(false);

    return {
      openDialog,
    };
  },
};
</script>

<style scoped>

</style>
