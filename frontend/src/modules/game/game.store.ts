import { Game } from '@/modules/game/game.model';

interface StateInterface {
  games: { [key: string]: Game };
}

const state: StateInterface = {
  games: {},
};

export const moduleGame = {
  namespaced: true,
  state,
  mutations: {
    addGames(state: StateInterface, games: { [key: string]: Game }) {
      Object.assign(state.games, games);
    },
    addGame(state: StateInterface, game: Game) {
      if (game.id !== undefined) {
        state.games[game.id] = game;
      }
    },
    deleteGame(state: StateInterface, game: Game) {
      if (game.id !== undefined) {
        delete state.games[game.id];
      }
    },
  },
};
