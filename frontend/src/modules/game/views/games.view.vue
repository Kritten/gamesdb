<template>
  <!--    <create-game />-->
  <list-games analog-only />
</template>

<script lang="ts">
import ListGames from '@/modules/game/list/list-games.vue';
import CreateGame from '@/modules/game/create/create-game.vue';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ViewGames',
  components: { CreateGame, ListGames },
  setup() {
    const { t } = useI18n();

    return { t };
  },
});
</script>

<style scoped></style>
