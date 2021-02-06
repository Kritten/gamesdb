import { apolloClient } from '@/vue-apollo';
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
  InputCollection,
} from '@/modules/app/utilities/collection/collection.types';
import { queue } from '@/queue';
import { Ref, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { store } from '@/modules/app/app.store';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import { router } from '@/modules/app/app.router';
import type { GameInterface } from '@/modules/game/game.types';

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
          router.push({
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
    const response = await apolloClient.mutate({
      mutation: mutationCreateGame,
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
    const response = await apolloClient.mutate({
      mutation: mutationUpdateGame,
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
    // @ts-ignore
    let game: Game = store.state.moduleGame.games[id];

    if (game === undefined) {
      const response = await apolloClient.query({
        query: queryGame,
        variables: {
          id,
        },
      });

      game = await Game.parseFromServer(response.data.game);

      store.commit('moduleGame/addGame', game);
    }

    return game;
  }

  async loadPage(data: InputCollection) {
    return loadPageBase<Game>({
      data,
      query: queryPageGame,
      parseResult: async response => ({
        items: await Promise.all(
          response.data.games.items.map((game: Game) => Game.parseFromServer(game)),
        ),
        count: response.data.games.count,
      }),
      after: ({ items }) =>
        store.commit(
          'moduleGame/addGames',
          items.reduce((obj, entity) => {
            obj[entity.id as ID] = entity;
            return obj;
          }, {} as { [key: string]: Game }),
        ),
    });
  }

  async delete(game: Game) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteGame,
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
