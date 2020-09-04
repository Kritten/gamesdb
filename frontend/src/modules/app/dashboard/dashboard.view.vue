<template>
  <h2>Zuletzt gespielt</h2>
  <template v-if="lastSessionAnalog.session.value !== undefined">
    {{ lastSessionAnalog.session.value.game.name }} am
    <base-date-time
      :value="lastSessionAnalog.lastDate.value"
      date-only
    />
  </template>
  <h2>Zuletzt gezockt</h2>
  <template v-if="lastSessionDigital.session.value !== undefined">
    {{ lastSessionDigital.session.value.game.name }} am
    <base-date-time
      :value="lastSessionDigital.lastDate.value"
      date-only
    />
  </template>
  <h2>Meist gespielte Spiele</h2>
  <table border="1">
    <tr
      v-for="(data, index) in gamesCountPlayedAnalog.statistics.value.items"
      :key="index"
    >
      <td>{{ data.name }}</td>
      <td>{{ data.countPlayed }}</td>
    </tr>
  </table>
  <h2>Meist gespielte {{t('game.digital.label', 2)}}</h2>
  <table border="1">
    <tr
      v-for="(data, index) in gamesCountPlayedDigital.statistics.value.items"
      :key="index"
    >
      <td>{{ data.name }}</td>
      <td>{{ data.countPlayed }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceSession } from '@/modules/session/session.service';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ViewDashboard',
  components: { BaseDateTime },
  setup() {
    const { t } = useI18n();
    const lastSessionAnalog = ServiceSession.useLastSession({ analogOnly: true });
    const lastSessionDigital = ServiceSession.useLastSession({ digitalOnly: true });

    const gamesCountPlayedAnalog = ServiceStatistics.useGamesCountPlayed({ analogOnly: true });
    const gamesCountPlayedDigital = ServiceStatistics.useGamesCountPlayed({ digitalOnly: true });

    return {
      t,
      lastSessionAnalog,
      lastSessionDigital,
      gamesCountPlayedAnalog,
      gamesCountPlayedDigital,
    };
  },
});
</script>

<style scoped>

</style>
