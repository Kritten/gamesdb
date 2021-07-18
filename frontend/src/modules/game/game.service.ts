import {
  queryPageGame,
} from '@/modules/game/graphql/game.graphql';
import { Game } from '@/modules/game/game.model';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import {
  ServiceCollectionFilters,
  ServiceCollectionInterface,
  InputCollection, ServiceCollectionLoadPage,
} from '@/modules/app/utilities/collection/collection.types';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import type { GameLoading } from '@/modules/game/game.types';
import { useRouter } from 'vue-router';
import { useGame } from '@/modules/game/composables/useGame';

class ServiceGameClass implements ServiceCollectionInterface<GameLoading> {
  useRandomGame({ filters }: { filters: ServiceCollectionFilters }) {
    return {
      select: async () => {
        const games = await this.loadPage({
          count: 1,
          filters: Object.values(filters),
          page: 1,
          sortBy: ['RAND()'],
          sortDesc: [],
        });

        const game = games.items[0];

        if (game.value !== null) {
          const router = useRouter();
          void router.push({
            name: 'game',
            params: {
              id: game.value.id as string,
            },
          });
        }
      },
    };
  }

  async loadPage(data: InputCollection) {
    return loadPageBase<GameLoading, {games: ServiceCollectionLoadPage<Game>}>({
      data,
      query: queryPageGame,
      parseResult: async (response) => {
        const { get } = useGame();
        return {
          items: await Promise.all(
            response.games.items.map((game: Game) => get(game.id as ID)),
          ),
          count: response.games.count,
        };
      },
    });
  }
}

export const ServiceGame = new ServiceGameClass();
