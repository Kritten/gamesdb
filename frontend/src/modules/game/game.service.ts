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
import { ID } from '@/modules/app/utilities/entity/entity.types';
import {
  ServiceCollectionLoadPageParameters,
  ServiceCollectionLoadPageReturn,
  ServiceCollectionStatic,
} from '@/modules/app/utilities/collection/collection.types';
import { ref } from 'vue';
import { Session } from '@/modules/session/session.model';
import { queue } from '@/queue';

export const ServiceGame: ServiceCollectionStatic = class {
  static useCreate() {
    const game = ref(new Game());

    return {
      game,
      create: async () => {
        await ServiceGame.create(game.value);
        game.value = new Game();
      },
    };
  }

  static useDelete() {
    return {
      delete: (game: Game) => ServiceGame.delete(game),
    };
  }

  static async create(game: Game) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateGame,
      variables: {
        game,
      },
    });
    console.warn('response', response);

    queue.notify('createdGame', new Session(response.data.game));
  }

  static async loadGame(id: ID) {
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

  static async loadPage({
    page,
    count,
    sortBy,
    sortDesc,
    params,
  }: ServiceCollectionLoadPageParameters): ServiceCollectionLoadPageReturn {
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

    const entities: Entity[] = response.data.games.items.map((game: Game) =>
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

  static async delete(game: Game) {
    await apolloClient.mutate({
      mutation: mutationDeleteGame,
      variables: {
        id: game.id,
      },
    });

    queue.notify('deletedGame', game);
  }
};
