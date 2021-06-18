import { ID } from '@/modules/app/utilities/entity/entity.types';
import { Game } from '@/modules/game/game.model';
import { ref } from 'vue';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';

const games = ref<Record<ID, Game>>({});
const countTotalAnalog = ref<number>();
const countTotalDigital = ref<number>();

export const useGame = () => {
  const useEntity = baseUseEntity<Game>({
    entities: games,
  });

  return {
    setGames: useEntity.setEntities,
    setGame: useEntity.setEntity,
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
  };
};
