<template>
  <template v-if="game !== null">
    <h1>{{ game.name }}</h1>
    <p>{{ game.description }}</p>

    <details>
      <summary>Spiel bearbeiten</summary>
      <update-game :game="game" />
    </details>
    <h2>Sessions</h2>
    <details>
      <summary>Session anlegen</summary>
      <create-session :game="game" />
    </details>
    <list-session :game="game" />
    <delete-game :game="game" />
  </template>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ServiceGame } from '@/modules/game/game.service';
import { Game } from '@/modules/game/game.model';
import CreateSession from '@/modules/session/create/create-session.vue';
import ListSession from '@/modules/session/list/list-sessions.vue';
import DeleteGame from '@/modules/game/delete/delete-game.vue';
import UpdateGame from '@/modules/game/update/update-game.vue';

export default defineComponent({
  name: 'ViewGame',
  components: {
    UpdateGame, DeleteGame, ListSession, CreateSession,
  },
  setup() {
    const route = useRoute();
    const idGame = route.params.id as string;
    const game = ref<Game | null>(null);

    ServiceGame.getOrLoadGame(idGame).then((value: Game) => { game.value = value; });

    return {
      game,
    };
  },
});
</script>

<style scoped></style>
