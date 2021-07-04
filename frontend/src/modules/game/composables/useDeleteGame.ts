import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { Game } from '@/modules/game/game.model';
import { useGame } from '@/modules/game/composables/useGame';
import { mutationDeleteGame } from '@/modules/game/graphql/game.graphql';

export const useDeleteGame = () => {
  const useDeleteEntity = baseUseDeleteEntity<Game, { deleteGames: Game }>({
    deleteEntity: useGame().deleteGame,
    mutation: mutationDeleteGame,
    emits: ['deletedGame'],
  });

  return {
    ...useDeleteEntity,
  };
};
