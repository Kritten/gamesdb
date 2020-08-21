import { apolloClient } from '@/vue-apollo';
import { queryPageGame } from '@/modules/game/graphql/game.graphql';
import { Game } from '@/modules/game/game.model';
import { ref } from 'vue';

export class ServiceGame {
  static useCollection() {
    const items = ref([]);

    const loadNextItems = () => {
      ServiceGame.loadPage({
        page: 1,
        count: 5,
        sortBy: 'name',
        sortDesc: false,
      }).then((data: Game[]) => {
        console.log(data[0], 'data[0]');
        items.value = data;
      });
    };

    loadNextItems();

    return {
      items,
      loadNextItems,
    };
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
    console.warn(response.data.games[0], 'response.data.games[0]');
    return response.data.games.map((game: Game) => Game.parseFromServer(game));
  }
}
