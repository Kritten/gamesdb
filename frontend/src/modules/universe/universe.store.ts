import { Universe } from '@/modules/universe/universe.model';

interface StateInterface {
  universes: Universe[] | null;
}

export const moduleUniverse = {
  namespaced: true,
  state: {
    universes: null,
  },
  mutations: {
    setUniverses(state: StateInterface, universes: Universe[]) {
      state.universes = universes;
    },
    addUniverse(state: StateInterface, universe: Universe) {
      if (state.universes !== null && universe.id !== undefined) {
        state.universes[universe.id] = universe;
      }
    },
    deleteUniverse(state: StateInterface, universe: Universe) {
      if (state.universes !== null && universe.id !== undefined) {
        delete state.universes[universe.id];
      }
    },
  },
};
