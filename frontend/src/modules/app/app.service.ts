import { apolloClient } from '@/vue-apollo';
import { queryUserCurrent } from '@/modules/user/graphql/user.graphql';
import { User } from '@/modules/user/user.model';
import { store } from '@/modules/app/app.store';
import { router } from '@/modules/app/app.router';

export class ServiceApp {
  static async initialize() {
    try {
      const response = await apolloClient.query({
        query: queryUserCurrent,
      });

      await ServiceApp.setCurrentUser(response.data.user);

      store.commit('setIsInitialized', true);

      if (router.currentRoute.value.name === 'login') {
        router.push({
          name: 'dashboard',
        });
      }
    } catch (e) {}

    store.commit('setIsInitialized', true);
  }
  /**
   * Set current user
   */
  static async setCurrentUser(data: {}) {
    const user = new User(data);
    await store.dispatch('setUser', user);
  }
}
