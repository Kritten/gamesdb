import { Session } from '@/modules/session/session.model';

interface StateInterface {
  sessions: { [key: number]: Session };
}

export const moduleSession = {
  namespaced: true,
  state: {
    sessions: {},
  },
  mutations: {
    setSessionsIfNotExisting(state: StateInterface, sessions: { [key: number]: Session }) {
      Object.assign(state.sessions, sessions);
    },
  },
};
