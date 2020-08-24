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
  </tr>
</template>

<script>
import { Session } from '@/modules/session/session.model';

export default {
  name: 'ListItemSession',
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
