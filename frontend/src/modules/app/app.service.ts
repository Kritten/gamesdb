import { apolloClient } from '@/vue-apollo';
import { queryUserCurrent } from '@/modules/user/graphql/user.graphql';
import { User } from '@/modules/user/user.model';
import { store } from '@/modules/app/app.store';
import { router } from '@/modules/app/app.router';
import { queryCategories } from '@/modules/category/graphql/category.graphql';
import { Category } from '@/modules/category/category.model';
import { queryMechanisms } from '@/modules/mechanism/graphql/mechanism.graphql';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { queryMoods } from '@/modules/mood/graphql/mood.graphql';
import { Mood } from '@/modules/mood/mood.model';
import { queryPlayers } from '@/modules/player/graphql/player.graphql';
import { Player } from '@/modules/player/player.model';
import { queryUniverses } from '@/modules/universe/graphql/universe.graphql';
import { Universe } from '@/modules/universe/universe.model';

export class ServiceApp {
  static async initialize() {
    try {
      const response = await apolloClient.query({
        query: queryUserCurrent,
      });

      await ServiceApp.setCurrentUser(response.data.user);

      await ServiceApp.loadInitialData().then();

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

  static async loadInitialData() {
    await Promise.all([
      apolloClient
        .query({
          query: queryCategories,
        })
        .then(response => Category.convertFromServerToStore(response.data.categories))
        .then(categories => {
          store.commit('moduleCategory/setCategories', categories);
        }),
      apolloClient
        .query({
          query: queryMechanisms,
        })
        .then(response => Mechanism.convertFromServerToStore(response.data.mechanisms))
        .then(mechanisms => {
          store.commit('moduleMechanism/setMechanisms', mechanisms);
        }),
      apolloClient
        .query({
          query: queryMoods,
        })
        .then(response => Mood.convertFromServerToStore(response.data.moods))
        .then(moods => {
          store.commit('moduleMood/setMoods', moods);
        }),
      apolloClient
        .query({
          query: queryPlayers,
        })
        .then(response => Player.convertFromServerToStore(response.data.players))
        .then(players => {
          store.commit('modulePlayer/setPlayers', players);
        }),
      apolloClient
        .query({
          query: queryUniverses,
        })
        .then(response => Universe.convertFromServerToStore(response.data.universes))
        .then(universes => {
          store.commit('moduleUniverse/setUniverses', universes);
        }),
    ]);
  }
}
