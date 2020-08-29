import { Mechanism } from '@/modules/mechanism/mechanism.model';

interface StateInterface {
  mechanisms: { [key: string]: Mechanism };
}

const state: StateInterface = {
  mechanisms: {},
};

export const moduleMechanism = {
  namespaced: true,
  state,
  mutations: {
    setMechanisms(state: StateInterface, mechanisms: { [key: string]: Mechanism }) {
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
