<template>
  <h2>Zuletzt gespielt:</h2>
  <template v-if="lastSessionAnalog.session.value !== undefined">
    {{ lastSessionAnalog.session.value.game.name }} am
    <base-date :value="lastSessionAnalog.lastDate.value" />
  </template>
  <h2>Zuletzt gezockt:</h2>
  <template v-if="lastSessionDigital.session.value !== undefined">
    {{ lastSessionDigital.session.value.game.name }} am
    <base-date :value="lastSessionDigital.lastDate.value" />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceSession } from '@/modules/session/session.service';
import BaseDate from '@/modules/app/base/base-date.vue';

export default defineComponent({
  name: 'ViewDashboard',
  components: { BaseDate },
  setup() {
    const lastSessionAnalog = ServiceSession.useLastSession({ analogOnly: true });
    const lastSessionDigital = ServiceSession.useLastSession({ digitalOnly: true });

    return {
      lastSessionAnalog,
      lastSessionDigital,
    };
  },
});
</script>

<style scoped>

</style>
