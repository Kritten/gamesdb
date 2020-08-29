import { Player } from '@/modules/player/player.model';

interface StateInterface {
  players: { [key: string]: Player };
}

const state: StateInterface = {
  players: {},
};

export const modulePlayer = {
  namespaced: true,
  state,
  mutations: {
    setPlayers(state: StateInterface, players: { [key: string]: Player }) {
      state.players = players;
    },
    addPlayer(state: StateInterface, player: Player) {
      if (state.players !== null && player.id !== undefined) {
        state.players[player.id] = player;
      }
    },
    deletePlayer(state: StateInterface, player: Player) {
      if (state.players !== null && player.id !== undefined) {
        delete state.players[player.id];
      }
    },
  },
};
