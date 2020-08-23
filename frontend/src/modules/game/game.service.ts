import { apolloClient } from '@/vue-apollo';
import { queryGame, queryPageGame } from '@/modules/game/graphql/game.graphql';
import { Game } from '@/modules/game/game.model';
import { ref, computed } from 'vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { store } from '@/modules/app/app.store';
import { ID } from '@/modules/app/utilities/entity/entity.types';

export class ServiceGame {
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
  }: {
    page: number;
    count: number;
    sortBy: string;
    sortDesc: boolean;
  }) {
    const response = await apolloClient.query({
      query: queryPageGame,
      variables: {
        page,
        count,
        sortBy,
        sortDesc,
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
}
