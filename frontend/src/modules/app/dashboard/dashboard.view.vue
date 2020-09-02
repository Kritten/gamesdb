<template>
  <h2>Letztes Spiel:</h2>
  <template v-if="lastSession !== null">
    {{ lastSession.game.name }} am <base-date :value="lastDate" />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { Session } from '@/modules/session/session.model';
import { ServiceSession } from '@/modules/session/session.service';
import BaseDate from '@/modules/app/base/base-date.vue';
import { compareAsc } from 'date-fns';

export default defineComponent({
  name: 'ViewDashboard',
  components: { BaseDate },
  setup() {
    const lastSession = ref<Session | null>(null);

    ServiceSession.getSessionLast().then((session) => {
      lastSession.value = session;
    });

    return {
      lastSession,
      lastDate: computed(() => {
        if (lastSession.value === null) {
          return null;
        }
        return lastSession.value.playtimes.map((playtime) => playtime.end).sort(compareAsc)[lastSession.value.playtimes.length - 1];
      }),
      compareAsc,
    };
  },
});
</script>

<style scoped>

</style>
