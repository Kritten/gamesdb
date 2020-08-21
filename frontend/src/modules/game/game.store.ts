import { Game } from '@/modules/game/game.model';

interface StateInterface {
  games: Game[] | null;
}

export const moduleGame = {
  namespaced: true,
  state: {
    games: null,
  },
  mutations: {
    setGames(state: StateInterface, games: Game[]) {
      state.games = games;
    },
  },
};
