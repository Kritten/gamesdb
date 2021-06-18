import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { Game } from '@/modules/game/game.model';
import { useGame } from '@/modules/game/composables/useGame';
import { mutationCreateGame } from '@/modules/game/graphql/game.graphql';

export const useCreateGame = () => {
  const useCreateEntity = baseUseCreateEntity<Game, { createGame: Game }>({
    cls: Game,
    setEntity: useGame().setGame,
    mutation: mutationCreateGame,
    nameMutation: 'createGame',
    nameVariable: 'game',
  });

  return {
    ...useCreateEntity,
  };
};
