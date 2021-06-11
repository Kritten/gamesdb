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
import { query } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { useUser } from '@/modules/user/composables/useUser';
import { useApp } from '@/modules/app/composables/useApp';
import { useRouter } from '@/router';
import { usePlayers } from '@/modules/player/composables/usePlayers';
import { useStatistics } from '@/modules/statistics/composables/useStatistics';

class ServiceAppClass {
  async initialize() {
    const { setUser } = useUser();
    try {
      const response = await query<{user: UserInterface}>(queryUserCurrent);

      setUser(response.user);

      await this.loadInitialData().then();

      const router = useRouter();
      if ((router.currentRoute as unknown as {name: string}).name === 'login') {
        void router
          .push({
            name: 'dashboard',
          });
      }
    } catch (e) {
      setUser(null);
    }

    useApp().setIsInitialized(true);
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
      query<{categories: Array<EntityInterface>}>(queryCategories)
        .then((response) => Category.convertFromServerToStore(response.categories))
        .then((categories) => {
          store.commit('moduleCategory/setCategories', categories);
        }),
      query<{mechanisms: Array<EntityInterface>}>(queryMechanisms)
        .then((response) => Mechanism.convertFromServerToStore(response.mechanisms))
        .then((mechanisms) => {
          store.commit('moduleMechanism/setMechanisms', mechanisms);
        }),
      query<{moods: Array<EntityInterface>}>(queryMoods)
        .then((response) => Mood.convertFromServerToStore(response.moods))
        .then((moods) => {
          store.commit('moduleMood/setMoods', moods);
        }),
      query<{players: Array<EntityInterface>}>(queryPlayers)
        .then((response) => Player.convertFromServerToStore<Player>(response.players))
        .then((players) => {
          usePlayers().setPlayers(players);
        }),
      query<{universes: Array<EntityInterface>}>(queryUniverses)
        .then((response) => Universe.convertFromServerToStore(response.universes))
        .then((universes) => {
          store.commit('moduleUniverse/setUniverses', universes);
        }),
      useStatistics().loadStatisticsCounts(),
    ]);
  }
}

export const ServiceApp = new ServiceAppClass();
