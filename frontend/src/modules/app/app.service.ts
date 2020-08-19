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
import { queryImages } from '@/modules/image/graphql/image.graphql';
import { Image } from '@/modules/image/image.model';
import { queryUniverses } from '@/modules/universe/graphql/universe.graphql';
import { Universe } from '@/modules/universe/universe.model';

export class ServiceApp {
  static async initialize() {
    try {
      const response = await apolloClient.query({
        query: queryUserCurrent,
      });

      await ServiceApp.setCurrentUser(response.data.user);

      ServiceApp.loadInitialData().then();

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
        .then(response => {
          store.commit(
            'moduleCategory/setCategories',
            Category.convertFromServerToStore(response.data.categories),
          );
        }),
      apolloClient
        .query({
          query: queryMechanisms,
        })
        .then(response => {
          store.commit(
            'moduleMechanism/setMechanisms',
            Mechanism.convertFromServerToStore(response.data.mechanisms),
          );
        }),
      apolloClient
        .query({
          query: queryMoods,
        })
        .then(response => {
          store.commit('moduleMood/setMoods', Mood.convertFromServerToStore(response.data.moods));
        }),
      apolloClient
        .query({
          query: queryPlayers,
        })
        .then(response => {
          store.commit(
            'modulePlayer/setPlayers',
            Player.convertFromServerToStore(response.data.players),
          );
        }),
      apolloClient
        .query({
          query: queryImages,
        })
        .then(response => {
          store.commit(
            'moduleImage/setImages',
            Image.convertFromServerToStore(response.data.images),
          );
        }),
      apolloClient
        .query({
          query: queryUniverses,
        })
        .then(response => {
          store.commit(
            'moduleUniverse/setUniverses',
            Universe.convertFromServerToStore(response.data.universes),
          );
        }),
    ]);
  }
}
