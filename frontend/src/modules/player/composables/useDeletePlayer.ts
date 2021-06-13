import { Player } from '@/modules/player/player.model';
import { usePlayers } from '@/modules/player/composables/usePlayers';
import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { mutationDeletePlayer } from '@/modules/player/graphql/player.graphql';

export const useDeletePlayer = () => {
  const useDeleteEntity = baseUseDeleteEntity<Player, { deletePlayer: Player }>({
    deleteEntity: usePlayers().deletePlayer,
    mutation: mutationDeletePlayer,
  });

  return {
    ...useDeleteEntity,
  };
};
