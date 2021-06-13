import { createStore } from 'vuex';
import { User } from '@/modules/user/user.model';
import { moduleCategory } from '@/modules/category/category.store';
import { moduleImage } from '@/modules/image/image.store';
import { moduleGame } from '@/modules/game/game.store';
import { moduleSession } from '@/modules/session/session.store';
import { moduleWishlist } from '@/modules/wishlist/wishlist.store';

export type UserState = User | null;

interface State {
  isInitialized: boolean;
  user?: UserState;
  messagesSnackbar: [];
  optionsForm: Record<string, string>;
}

const state: State = {
  isInitialized: false,
  user: undefined,
  messagesSnackbar: [],
  optionsForm: {
    size: 'mini',
    'label-width': '150px',
    'label-position': 'left',
  },
};

export const store = createStore({
  modules: {
    moduleCategory,
    moduleImage,
    moduleGame,
    moduleSession,
    moduleWishlist,
  },
  state,
  mutations: {
    setIsInitialized(statePassed, value: boolean) {
      statePassed.isInitialized = value;
    },
    setUser(statePassed, value: User) {
      statePassed.user = value;
    },
    // addSnackbar(state, data) {
    //   state.messagesSnackbar.push(data);
    // },
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
