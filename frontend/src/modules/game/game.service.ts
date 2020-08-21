import { apolloClient } from '@/vue-apollo';
import { queryPageGame } from '@/modules/game/graphql/game.graphql';
import { Game } from '@/modules/game/game.model';
import { ref, computed } from 'vue';

export class ServiceGame {
  static useCollection() {
    const items = ref<Game[]>([]);
    const countItems = ref(-1);
    let page = 0;
    let countPerPage = 10;
    let sortBy = 'name';
    let sortDesc = false;

    const hasNextPage = computed(() => countItems.value !== items.value.length);

    const loadNextItems = () => {
      page += 1;

      ServiceGame.loadPage({
        page,
        count: countPerPage,
        sortBy,
        sortDesc,
      }).then(({ count, items: itemsLocal }: { count: number; items: Game[] }) => {
        countItems.value = count;
        items.value = items.value.concat(itemsLocal);
      });
    };

    loadNextItems();

    return {
      items,
      countItems,
      hasNextPage,
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
