import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateGame,
  mutationDeleteGame,
  mutationUpdateGame,
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
import { cloneDeep } from 'lodash';

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

  useUpdate(gamePassed: Game) {
    let game = ref(cloneDeep(gamePassed));

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

  async create(game: Game) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateGame,
      variables: {
        game: game.prepareForServer(),
      },
    });

    const gameNew = await Game.parseFromServer(response.data.createGame);

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

    queue.notify('createdGame', gameNew);

    return gameNew;
  }

  async loadGame(id: ID) {
    const response = await apolloClient.query({
      query: queryGame,
      variables: {
        id,
      },
    });

    return await Game.parseFromServer(response.data.game);
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

    const entities: Game[] = await Promise.all(
      response.data.games.items.map((game: Game) => Game.parseFromServer(game)),
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
