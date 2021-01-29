import { apolloClient } from '@/vue-apollo';
import { queryUserCurrent } from '@/modules/user/graphql/user.graphql';
import { User } from '@/modules/user/user.model';
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
import { UserInterface } from '@/modules/user/user.types';
import { store } from '@/modules/app/app.store';
import { router } from '@/modules/app/app.router';

class ServiceAppClass {
  async initialize() {
    try {
      const response = await apolloClient.query({
        query: queryUserCurrent,
      });

      await this.setCurrentUser(response.data.user);

      await this.loadInitialData().then();

      store.commit('setIsInitialized', true);

      if (router.currentRoute.value.name === 'login') {
        router
          .push({
            name: 'dashboard',
          })
          .then();
      }
    } catch (e) {
      await this.setCurrentUser(null);
    }

    store.commit('setIsInitialized', true);
  }

  /**
   * Set current user
   */
  async setCurrentUser(data: UserInterface | null) {
    let user: User | null = null;

    if (data !== null) {
      user = new User(data);
    }

    await store.dispatch('setUser', user);
  }

  async loadInitialData() {
    await Promise.all([
      apolloClient
        .query({
          query: queryCategories,
        })
        .then((response) => Category.convertFromServerToStore(response.data.categories))
        .then((categories) => {
          store.commit('moduleCategory/setCategories', categories);
        }),
      apolloClient
        .query({
          query: queryMechanisms,
        })
        .then((response) => Mechanism.convertFromServerToStore(response.data.mechanisms))
        .then((mechanisms) => {
          store.commit('moduleMechanism/setMechanisms', mechanisms);
        }),
      apolloClient
        .query({
          query: queryMoods,
        })
        .then((response) => Mood.convertFromServerToStore(response.data.moods))
        .then((moods) => {
          store.commit('moduleMood/setMoods', moods);
        }),
      apolloClient
        .query({
          query: queryPlayers,
        })
        .then((response) => Player.convertFromServerToStore(response.data.players))
        .then((players) => {
          store.commit('modulePlayer/setPlayers', players);
        }),
      apolloClient
        .query({
          query: queryUniverses,
        })
        .then((response) => Universe.convertFromServerToStore(response.data.universes))
        .then((universes) => {
          store.commit('moduleUniverse/setUniverses', universes);
        }),
    ]);
  }
}

export const ServiceApp = new ServiceAppClass();
