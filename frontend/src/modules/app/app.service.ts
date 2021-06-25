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
import { query } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { useUser } from '@/modules/user/composables/useUser';
import { useApp } from '@/modules/app/composables/useApp';
import { useRouter } from '@/router';
import { usePlayers } from '@/modules/player/composables/usePlayers';
import { useStatistics } from '@/modules/statistics/composables/useStatistics';
import { useUniverse } from '@/modules/universe/composables/useUniverse';
import { useMood } from '@/modules/mood/composables/useMood';
import { useMechanism } from '@/modules/mechanism/composables/useMechanism';
import { useCategory } from '@/modules/category/composables/useCategory';
import { queue } from '@/queue';

class ServiceAppClass {
  async initialize() {
    const { setUser } = useUser();
    try {
      const response = await query<{user: UserInterface}>(queryUserCurrent);

      setUser(response.user);

      await this.loadInitialData().then();

      this.initializeEventListener();

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

  initializeEventListener() {
    for (const event of ['createdGame']) {
      queue.listen(event, () => {
        void useStatistics().loadStatisticsCounts();
      });
    }
  }

  async loadInitialData() {
    await Promise.all([
      query<{categories: Array<EntityInterface>}>(queryCategories)
        .then((response) => Category.convertFromServerToStore<Category>(response.categories))
        .then((categories) => {
          useCategory().setCategories(categories);
        }),
      query<{mechanisms: Array<EntityInterface>}>(queryMechanisms)
        .then((response) => Mechanism.convertFromServerToStore<Mechanism>(response.mechanisms))
        .then((mechanisms) => {
          useMechanism().setMechanisms(mechanisms);
        }),
      query<{moods: Array<EntityInterface>}>(queryMoods)
        .then((response) => Mood.convertFromServerToStore<Mood>(response.moods))
        .then((moods) => {
          useMood().setMoods(moods);
        }),
      query<{players: Array<EntityInterface>}>(queryPlayers)
        .then((response) => Player.convertFromServerToStore<Player>(response.players))
        .then((players) => {
          usePlayers().setPlayers(players);
        }),
      query<{universes: Array<EntityInterface>}>(queryUniverses)
        .then((response) => Universe.convertFromServerToStore<Universe>(response.universes))
        .then((universes) => {
          useUniverse().setUniverses(universes);
        }),
      useStatistics().loadStatisticsCounts(),
    ]);
  }
}

export const ServiceApp = new ServiceAppClass();
