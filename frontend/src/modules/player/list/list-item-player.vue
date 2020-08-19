<template>
  <tr>
    <td>
      {{ player.name }}
    </td>
    <td>
      <delete-player :player="player" />
    </td>
    <td>
      <update-player :player="player" />
    </td>
  </tr>
</template>

<script>
import DeletePlayer from '@/modules/player/delete/delete-player';
import { Player } from '@/modules/player/player.model';
import UpdatePlayer from '@/modules/player/update/update-player';

export default {
  name: 'ListItemPlayer',
  components: { UpdatePlayer, DeletePlayer },
  props: {
    player: {
      required: true,
      type: Player,
    },
  },
};
</script>

<style scoped>

</style>
