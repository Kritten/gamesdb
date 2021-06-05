import { useMutation } from '@vue/apollo-composable';
import {
  mutationCreateGame,
  mutationDeleteGame,
  mutationUpdateGame,
  queryGame,
  queryPageGame,
} from '@/modules/game/graphql/game.graphql';
import { Game } from '@/modules/game/game.model';
import { ID, ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';
import {
  ServiceCollectionFilters,
  ServiceCollectionInterface,
  InputCollection, ServiceCollectionLoadPage,
} from '@/modules/app/utilities/collection/collection.types';
import { queue } from '@/queue';
import { Ref, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { store } from '@/modules/app/app.store';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import type { GameInterface } from '@/modules/game/game.types';
import { query } from '@/modules/app/utilities/helpers';
import { useRouter } from 'vue-router';
import { useGames } from '@/modules/game/composables/useGames';

class ServiceGameClass implements ServiceCollectionInterface<Game>, ServiceEntityInterface<Game> {
  useCreate({ initialData }: { initialData: GameInterface } = { initialData: {} }) {
    const game = ref(new Game(initialData));

    return {
      entity: game,
      create: async () => {
        const gameNew = await this.create(game.value);
        game.value = new Game();
        return gameNew;
      },
    };
  }

  useUpdate(gamePassed: Game) {
    const game = ref(cloneDeep(gamePassed));

    return {
      entity: game,
      update: async () => {
        game.value = cloneDeep(await this.update(game.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (game: Game) => this.delete(game),
    };
  }

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

        if (game !== undefined) {
          const router = useRouter();
          void router.push({
            name: 'game',
            params: {
              id: game.id as string,
            },
          });
        }
      },
    };
  }

  async create(game: Game) {
    const { mutate } = useMutation(mutationCreateGame);

    const response = await mutate({
      variables: {
        game: game.prepareForServer(),
      },
    });

    const gameNew = await Game.parseFromServer(response.data.createGame);

    store.commit('moduleGame/addGame', gameNew);

    queue.notify('createdGame', gameNew);

    return gameNew;
  }

  async update(game: Game) {
    const { mutate } = useMutation(mutationUpdateGame);

    const response = await mutate({
      variables: {
        game: game.prepareForServer(),
      },
    });

    const gameNew = await Game.parseFromServer(response.data.updateGame);

    store.commit('moduleGame/addGame', gameNew);

    queue.notify('updatedGame', gameNew);

    return gameNew;
  }

  async getOrLoadGame(id: ID) {
    const { games, addGame } = useGames();
    let game = games.value[id];
    if (game === undefined) {
      const response = await query<{game: GameInterface}>(queryGame, {
        id,
      });

      game = await Game.parseFromServer(response.game);

      addGame(game);
    }

    return game;
  }

  async loadPage(data: InputCollection) {
    return loadPageBase<Game, {games: ServiceCollectionLoadPage<Game>}>({
      data,
      query: queryPageGame,
      parseResult: async (response) => ({
        items: await Promise.all(
          response.games.items.map((game: Game) => Game.parseFromServer(game)),
        ),
        count: response.games.count,
      }),
      after: ({ items }) => store.commit(
        'moduleGame/addGames',
        items.reduce((obj, entity) => {
          obj[entity.id as ID] = entity;
          return obj;
        }, {} as { [key: string]: Game }),
      ),
    });
  }

  async delete(game: Game) {
    const { mutate } = useMutation(mutationDeleteGame);

    const response = await mutate({
      variables: {
        id: game.id,
      },
    });

    queue.notify('deletedGame', game);

    store.commit('moduleGame/deleteGame', game);

    return response.data.deleteGame;
  }
}

export const ServiceGame = new ServiceGameClass();
