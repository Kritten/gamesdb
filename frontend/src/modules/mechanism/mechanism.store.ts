import { Mechanism } from '@/modules/mechanism/mechanism.model';

interface StateInterface {
  mechanisms: Mechanism[] | null;
}

export const moduleMechanism = {
  namespaced: true,
  state: {
    mechanisms: null,
  },
  mutations: {
    setMechanisms(state: StateInterface, mechanisms: Mechanism[]) {
      state.mechanisms = mechanisms;
    },
    addMechanism(state: StateInterface, mechanism: Mechanism) {
      if (state.mechanisms !== null && mechanism.id !== undefined) {
        state.mechanisms[mechanism.id] = mechanism;
      }
    },
    deleteMechanism(state: StateInterface, mechanism: Mechanism) {
      if (state.mechanisms !== null && mechanism.id !== undefined) {
        delete state.mechanisms[mechanism.id];
      }
    },
  },
};
