import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { Game } from '@/modules/game/game.model';
import { useGame } from '@/modules/game/composables/useGame';
import { mutationUpdateGame } from '@/modules/game/graphql/game.graphql';

export const useUpdateGame = (gamePassed: Game) => {
  const useUpdateEntity = baseUseUpdateEntity<Game, { updateGame: Game }>({
    cls: Game,
    entityPassed: gamePassed,
    setEntity: useGame().setGame,
    mutation: mutationUpdateGame,
    nameMutation: 'updateGame',
    nameVariable: 'game',
  });

  return {
    ...useUpdateEntity,
  };
};
