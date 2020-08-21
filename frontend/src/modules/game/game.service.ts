import { apolloClient } from '@/vue-apollo';
import { queryPageGame } from '@/modules/game/graphql/game.graphql';
import { Game } from '@/modules/game/game.model';
import { ref } from 'vue';

export class ServiceGame {
  static useCollection() {
    const items = ref<Game[]>([]);
    const page = 1;
    const count = 10;
    const sortBy = 'name';
    const sortDesc = false;

    const loadNextItems = () => {
      ServiceGame.loadPage({
        page,
        count,
        sortBy,
        sortDesc,
      }).then(({ count, items: itemsLocal }: { count: number; items: Game[] }) => {
        items.value = itemsLocal;
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

    return {
      count: response.data.games.count,
      items: response.data.games.items.map((game: Game) => Game.parseFromServer(game)),
    };
  }
}
