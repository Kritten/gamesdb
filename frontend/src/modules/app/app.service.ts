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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { UserInterface } from '@/modules/user/user.types';

class ServiceAppClass {
  async initialize() {
    try {
      const response = await apolloClient.query({
        query: queryUserCurrent,
      });

      await this.setCurrentUser(response.data.user);

      await this.loadInitialData().then();

      useStore().commit('setIsInitialized', true);

      if (useRouter().currentRoute.value.name === 'login') {
        useRouter()
          .push({
            name: 'dashboard',
          })
          .then();
      }
    } catch (e) {}

    useStore().commit('setIsInitialized', true);
  }
  /**
   * Set current user
   */
  async setCurrentUser(data: UserInterface) {
    const user = new User(data);
    await useStore().dispatch('setUser', user);
  }

  async loadInitialData() {
    await Promise.all([
      apolloClient
        .query({
          query: queryCategories,
        })
        .then(response => Category.convertFromServerToStore(response.data.categories))
        .then(categories => {
          useStore().commit('moduleCategory/setCategories', categories);
        }),
      apolloClient
        .query({
          query: queryMechanisms,
        })
        .then(response => Mechanism.convertFromServerToStore(response.data.mechanisms))
        .then(mechanisms => {
          useStore().commit('moduleMechanism/setMechanisms', mechanisms);
        }),
      apolloClient
        .query({
          query: queryMoods,
        })
        .then(response => Mood.convertFromServerToStore(response.data.moods))
        .then(moods => {
          useStore().commit('moduleMood/setMoods', moods);
        }),
      apolloClient
        .query({
          query: queryPlayers,
        })
        .then(response => Player.convertFromServerToStore(response.data.players))
        .then(players => {
          useStore().commit('modulePlayer/setPlayers', players);
        }),
      apolloClient
        .query({
          query: queryUniverses,
        })
        .then(response => Universe.convertFromServerToStore(response.data.universes))
        .then(universes => {
          useStore().commit('moduleUniverse/setUniverses', universes);
        }),
    ]);
  }
}

export const ServiceApp = new ServiceAppClass();
