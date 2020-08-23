import { Game } from '@/modules/game/game.model';

interface StateInterface {
  games: { [key: number]: Game };
}

export const moduleGame = {
  namespaced: true,
  state: {
    games: {},
  },
  mutations: {
    setGamesIfNotExisting(state: StateInterface, games: { [key: number]: Game }) {
      Object.assign(state.games, games);
    },
  },
};
