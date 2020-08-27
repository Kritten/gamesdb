<template>
  <template v-if="game !== undefined">
    <h1>{{ game.name }}</h1>
    <p>{{ game.description }}</p>
    <update-game :game="game" />
    <h2>Sessions</h2>
    <create-session :game="game" />
    <list-session :game="game" />
    <delete-game :game="game" />
  </template>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ServiceGame } from '@/modules/game/game.service';
import { Game } from '@/modules/game/game.model';
import CreateSession from '@/modules/session/create/create-session.vue';
import ListSession from '@/modules/session/list/list-sessions.vue';
import DeleteGame from '@/modules/game/delete/delete-game.vue';
import UpdateGame from '@/modules/game/update/update-game.vue';

export default {
  name: 'ViewGame',
  components: {
    UpdateGame, DeleteGame, ListSession, CreateSession,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const idGame = route.params.id as string;

    const game = computed<Game>(() => store.state.moduleGame.games[idGame]);

    if (game.value === undefined) {
      ServiceGame.loadGame(idGame);
    }

    return {
      game,
    };
  },
};
</script>

<style scoped></style>
