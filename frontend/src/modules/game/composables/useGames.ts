import { ID } from '@/modules/app/utilities/entity/entity.types';
import { Game } from '@/modules/game/game.model';
import { ref } from 'vue';

const games = ref<Record<ID, Game>>({});

export const useGames = () => ({
  games,
  setGames(gamesPassed: Record<ID, Game>) {
    games.value = gamesPassed;
  },
  addGame(gamePassed: Game) {
    if (gamePassed.id === undefined) {
      return;
    }

    games.value[gamePassed.id] = gamePassed;
  },
});
