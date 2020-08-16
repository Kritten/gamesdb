import Vuex from 'vuex';
import { User } from '@/modules/user/user.model';

export const store = Vuex.createStore({
  modules: {},
  state: {
    isInitialized: false,
    user: null,
    messagesSnackbar: [],
  },
  mutations: {
    setIsInitialized(state, value: boolean) {
      state.isInitialized = value;
    },
    setUser(state, value: User) {
      state.user = value;
    },
    addSnackbar(state, data) {
      Vue.set(state.messagesSnackbar, state.messagesSnackbar.length, data);
    },
  },
  actions: {
    setUser({ commit }, value: User) {
      commit('setUser', value);
    },
    addSnackbar({ commit }, data) {
      commit('addSnackbar', data);
    },
  },
});
