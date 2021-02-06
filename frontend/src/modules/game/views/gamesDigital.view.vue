<template>
  <h1>{{ t('game.digital.label', 2) }}f</h1>
  <details>
    <summary>{{ t('game.digital.label') }} {{ t('common.create') }}</summary>
    <create-game
      :initial-data="{
        isDigital: true,
      }"
    />
  </details>
  <list-games digital-only />
</template>

<script lang="ts">
import ListGames from '@/modules/game/list/list-games.vue';
import CreateGame from '@/modules/game/create/create-game.vue';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ViewGamesDigital',
  components: { CreateGame, ListGames },
  setup() {
    const { t } = useI18n();

    return { t };
  },
});
</script>

<style scoped></style>
