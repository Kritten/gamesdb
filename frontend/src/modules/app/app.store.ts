import Vuex from "vuex";

export const store = Vuex.createStore({
  modules: {},
  state: {
    isInitialized: true,
    isAuthenticated: false,
    messagesSnackbar: []
  },
  mutations: {
    setIsInitalized(state, value: boolean) {
      state.isInitialized = value;
    },
    setIsAuthenticated(state, value: boolean) {
      state.isAuthenticated = value;
    },
    addSnackbar(state, data) {
      Vue.set(state.messagesSnackbar, state.messagesSnackbar.length, data);
    }
  },
  actions: {
    setIsInitalized({ commit }, value: boolean) {
      commit("setIsInitalized", value);
    },
    setIsAuthenticated({ commit }, value: boolean) {
      commit("setIsAuthenticated", value);
    },
    addSnackbar({ commit }, data) {
      commit("addSnackbar", data);
    }
  }
});
