import { Player } from '@/modules/player/player.model';
import { compareDesc } from 'date-fns';

interface StateInterface {
  players: { [key: string]: Player };
}

const stateInitial: StateInterface = {
  players: {},
};

export const modulePlayer = {
  namespaced: true,
  state: stateInitial,
  getters: {
    playersSortedByLastPlayed(state: StateInterface): Array<Player> {
      const players = Object.values(state.players);

      players.sort((playerA, playerB) => compareDesc(playerA.lastSession, playerB.lastSession));

      return players;
    },
  },
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
