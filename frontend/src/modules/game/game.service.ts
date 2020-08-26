import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateGame,
  mutationDeleteGame,
  queryGame,
  queryPageGame,
} from '@/modules/game/graphql/game.graphql';
import { Game } from '@/modules/game/game.model';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { store } from '@/modules/app/app.store';
import { ID, ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';
import {
  ServiceCollectionInterface,
  ServiceCollectionLoadPageParameters,
} from '@/modules/app/utilities/collection/collection.types';
import { queue } from '@/queue';
import { ref } from 'vue';

class ServiceGameClass implements ServiceCollectionInterface<Game>, ServiceEntityInterface<Game> {
  useCreate() {
    const game = ref(new Game());

    return {
      entity: game,
      create: async () => {
        const gameNew = await this.create(game.value);
        game.value = new Game();
        return gameNew;
      },
    };
  }

  useDelete() {
    return {
      delete: (game: Game) => this.delete(game),
    };
  }

  async create(game: Game) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateGame,
      variables: {
        game,
      },
    });

    const newGame = new Game(response.data.game);

    queue.notify('createdGame', newGame);

    return newGame;
  }

  async loadGame(id: ID) {
    const response = await apolloClient.query({
      query: queryGame,
      variables: {
        id,
      },
    });

    const game = Game.parseFromServer(response.data.game);

    if (game.id !== undefined) {
      store.commit('moduleGame/setGamesIfNotExisting', {
        [game.id]: game,
      });
    }
  }

  async loadPage({ page, count, sortBy, sortDesc, params }: ServiceCollectionLoadPageParameters) {
    const response = await apolloClient.query({
      query: queryPageGame,
      variables: {
        page,
        count,
        sortBy,
        sortDesc,
        ...params,
      },
    });

    const entities: Game[] = response.data.games.items.map((game: Game) =>
      Game.parseFromServer(game),
    );

    store.commit(
      'moduleGame/setGamesIfNotExisting',
      entities.reduce((obj, entity) => {
        obj[entity.id as ID] = entity;
        return obj;
      }, {} as Partial<{ [key in ID]: Entity }>),
    );

    return {
      count: response.data.games.count,
      items: entities,
    };
  }

  async delete(game: Game) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteGame,
      variables: {
        id: game.id,
      },
    });

    queue.notify('deletedGame', game);

    return response.data.deleteGame;
  }
}

export const ServiceGame = new ServiceGameClass();
