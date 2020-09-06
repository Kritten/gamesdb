<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GamesCountPlayed from '@/modules/statistics/components/games-count-played.vue';
import GamesTimePlayed from '@/modules/statistics/components/games-time-played.vue';
import LastSession from '@/modules/statistics/components/last-session.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ViewDashboard',
  components: { GamesCountPlayed, GamesTimePlayed, LastSession },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>

<style scoped></style>
