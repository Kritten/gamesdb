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

<script lang="ts">
import DeletePlayer from '@/modules/player/delete/delete-player.vue';
import { Player } from '@/modules/player/player.model';
import UpdatePlayer from '@/modules/player/update/update-player.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItemPlayer',
  components: { UpdatePlayer, DeletePlayer },
  props: {
    player: {
      required: true,
      type: Player,
    },
  },
});
</script>

<style scoped>

</style>
