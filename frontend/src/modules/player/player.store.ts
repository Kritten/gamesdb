import { Player } from '@/modules/player/player.model';

interface StateInterface {
  players: Player[] | null;
}

export const modulePlayer = {
  namespaced: true,
  state: {
    players: null,
  },
  mutations: {
    setPlayers(state: StateInterface, players: Player[]) {
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
