import { Universe } from '@/modules/universe/universe.model';

interface StateInterface {
  universes: { [key: string]: Universe };
}

const state: StateInterface = {
  universes: {},
};

export const moduleUniverse = {
  namespaced: true,
  state,
  mutations: {
    setUniverses(state: StateInterface, universes: { [key: string]: Universe }) {
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
