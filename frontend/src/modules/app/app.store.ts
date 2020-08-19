import { createStore } from 'vuex';
import { User } from '@/modules/user/user.model';
import { moduleCategory } from '@/modules/category/category.store';
import { moduleMechanism } from '@/modules/mechanism/mechanism.store';

export const store = createStore({
  modules: {
    moduleCategory,
    moduleMechanism,
  },
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
