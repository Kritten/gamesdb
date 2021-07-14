import { ID } from '@/modules/app/utilities/entity/entity.types';
import { Game } from '@/modules/game/game.model';
import { ref } from 'vue';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';
import { query } from '@/modules/app/utilities/helpers';
import { GameInterface, GameLoading } from '@/modules/game/game.types';
import { queryGame } from '@/modules/game/graphql/game.graphql';

const games = ref<Record<ID, Game>>({});
const countTotalAnalog = ref<number>();
const countTotalDigital = ref<number>();

const gamesLoading = new Map<ID, GameLoading>();

export const useGame = () => {
  const useEntity = baseUseEntity<Game>({
    entities: games,
  });

  const setGame = useEntity.setEntity;

  return {
    setGames: useEntity.setEntities,
    setGame,
    deleteGame: useEntity.deleteEntity,

    games,

    countTotalAnalog,
    countTotalDigital,
    setCountTotalAnalog(value: number) {
      countTotalAnalog.value = value;
    },
    setCountTotalDigital(value: number) {
      countTotalDigital.value = value;
    },

    getOrLoad(id: ID): GameLoading {
      const gamePreloaded = games.value[id];

      if (gamePreloaded !== undefined) {
        return ref(gamePreloaded);
      }

      if (gamesLoading.has(id)) {
        return gamesLoading.get(id) as GameLoading;
      }

      console.warn(`Loading game ${id}`);

      const gameLoading: GameLoading = ref(null);

      gamesLoading.set(id, gameLoading);

      void query<{game: GameInterface}>(queryGame, {
        id,
      }).then(async (response) => {
        const game = await Game.parseFromServer(response.game);
        gameLoading.value = game;
        // gamesLoading.delete(id);
        setGame(game);
      });

      return gameLoading;
    },
  };
};
