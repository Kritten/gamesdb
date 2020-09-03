<template>
  <tr>
    <td>
      {{ session.id }}
    </td>
    <td>
      {{ session.isChallenge }}
    </td>
    <td>
      {{ session.players.map(player => player.name).join(', ') }}
    </td>
    <td>
      {{ session.winners.map(player => player.name).join(', ') }}
    </td>
    <td>
      <div
        v-for="(playtime, index) in session.playtimes"
        :key="index"
      >
        <display-playtime
          :start="playtime.start"
          :end="playtime.end"
        />
      </div>
    </td>
    <td>
      {{ session.comment }}
    </td>
    <td>
      <delete-session :session="session" />
    </td>
    <td>
      <update-session :session="session" />
    </td>
  </tr>
</template>

<script lang="ts">
import { Session } from '@/modules/session/session.model';
import DeleteSession from '@/modules/session/delete/delete-session.vue';
import UpdateSession from '@/modules/session/update/update-session.vue';
import DisplayPlaytime from '@/modules/playtime/display-playtime.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItemSession',
  components: {
    UpdateSession, DeleteSession, DisplayPlaytime,
  },
  props: {
    session: {
      required: true,
      type: Session,
    },
  },
});
</script>

<style scoped>

</style>
