<template>
  <tr>
    <td>
      {{ session.id }}
    </td>
    <td>
      {{ session.players.map(player => player.name).join(', ') }}
    </td>
    <td>
      {{ session.winners.map(player => player.name).join(', ') }}
    </td>
    <td>
      {{ session.playtimes.map(playtime => `${playtime.start} - ${playtime.end}`).join(', ') }}
    </td>
    <td>
      <delete-session :session="session" />
    </td>
  </tr>
</template>

<script lang="ts">
import { Session } from '@/modules/session/session.model';
import DeleteSession from '@/modules/session/delete/delete-session';

export default {
  name: 'ListItemSession',
  components: { DeleteSession },
  props: {
    session: {
      required: true,
      type: Session,
    },
  },
};
</script>

<style scoped>

</style>
