<template>
  <tr>
    <td>
      {{ session.id }}
      {{ session.game }}
      {{ session.players }}
      {{ session.winners }}
      {{ session.playtimes }}
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
