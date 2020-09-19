<template>
  <details>
    <summary>Session erstellen</summary>
    <create-session />
  </details>
  <hr>
  <list-sessions-virtual />
  <hr>

  <h2>Spielzeit pro Tag</h2>
  <h3>Analoge Spiele</h3>
  <playtimes-per-day analog-only />
  <h3>Digitale Spiele</h3>
  <playtimes-per-day digital-only />

  <h2>Zuletzt gespielt</h2>
  <last-session analog-only />
  <h2>Zuletzt gezockt</h2>
  <last-session digital-only />

  <h2>Meist gespielte Spiele</h2>
  <games-count-played analog-only />
  <h2>Meist gespielte {{ t('game.digital.label', 2) }}</h2>
  <games-count-played digital-only />

  <h2>Am längsten gespielte Spiele</h2>
  <games-time-played analog-only />
  <h2>Am längsten gespielte {{ t('game.digital.label', 2) }}</h2>
  <games-time-played digital-only />

  <h2>Bestbewertetste Spiele</h2>
  <games-best-rated analog-only />
  <h2>Bestbewertetste {{ t('game.digital.label', 2) }}</h2>
  <games-best-rated digital-only />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateSession from '@/modules/session/create/create-session.vue';
import GamesCountPlayed from '@/modules/statistics/components/games-count-played.vue';
import GamesTimePlayed from '@/modules/statistics/components/games-time-played.vue';
import GamesBestRated from '@/modules/statistics/components/games-best-rated.vue';
import PlaytimesPerDay from '@/modules/statistics/components/playtimes-per-day.vue';
import LastSession from '@/modules/statistics/components/last-session.vue';
import ListSessionsVirtual from '@/modules/session/list/list-sessions-virtual.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ViewDashboard',
  components: {
    CreateSession, GamesCountPlayed, GamesTimePlayed, GamesBestRated, LastSession, ListSessionsVirtual, PlaytimesPerDay,
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>

<style scoped></style>
