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
      v-for="(data, index) in collectionStatisticsGamesCountPlayedAnalog.items.value"
      :key="index"
    >
      <td>{{ data.name }}</td>
      <td>{{ data.countPlayed }}</td>
    </tr>
  </table>

  <button
    v-if="collectionStatisticsGamesCountPlayedAnalog.hasNextPage.value"
    :disabled="collectionStatisticsGamesCountPlayedAnalog.isLoading.value === true"
    @click="collectionStatisticsGamesCountPlayedAnalog.loadNextItems"
  >
    Mehr laden
  </button>
  <h2>Meist gespielte {{ t('game.digital.label', 2) }}</h2>
  <table border="1">
    <tr
      v-for="(data, index) in collectionStatisticsGamesCountPlayedDigital.items.value"
      :key="index"
    >
      <td>{{ data.name }}</td>
      <td>{{ data.countPlayed }}</td>
    </tr>
  </table>

  <button
    v-if="collectionStatisticsGamesCountPlayedDigital.hasNextPage.value"
    :disabled="collectionStatisticsGamesCountPlayedDigital.isLoading.value === true"
    @click="collectionStatisticsGamesCountPlayedDigital.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceSession } from '@/modules/session/session.service';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { useI18n } from 'vue-i18n';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { GamesCountPlayedItem } from '@backend/src/modules/statistics/collection/gamesCountPlayed.collectionData.model';

export default defineComponent({
  name: 'ViewDashboard',
  components: { BaseDateTime },
  setup() {
    const { t } = useI18n();
    const lastSessionAnalog = ServiceSession.useLastSession({ analogOnly: true });
    const lastSessionDigital = ServiceSession.useLastSession({ digitalOnly: true });

    const collectionStatisticsGamesCountPlayedAnalog = useCollection<GamesCountPlayedItem>(
      ServiceStatistics.loadPageStatisticsGamesCountPlayed,
      {
        sortBy: 'countPlayed',
        sortDesc: true,
      },
      {
        analogOnly: true,
      },
    );
    const collectionStatisticsGamesCountPlayedDigital = useCollection<GamesCountPlayedItem>(
      ServiceStatistics.loadPageStatisticsGamesCountPlayed,
      {
        sortBy: 'countPlayed',
        sortDesc: true,
      },
      {
        digitalOnly: true,
      },
    );

    return {
      t,
      lastSessionAnalog,
      lastSessionDigital,
      collectionStatisticsGamesCountPlayedAnalog,
      collectionStatisticsGamesCountPlayedDigital,
    };
  },
});
</script>

<style scoped></style>
