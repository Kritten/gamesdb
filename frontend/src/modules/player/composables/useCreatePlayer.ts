import { Player } from '@/modules/player/player.model';
import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { usePlayers } from '@/modules/player/composables/usePlayers';
import { mutationCreatePlayer } from '@/modules/player/graphql/player.graphql';

export const useCreatePlayer = () => {
  const useCreateEntity = baseUseCreateEntity<Player, { createPlayer: Player }>({
    cls: Player,
    setEntity: usePlayers().setPlayer,
    mutation: mutationCreatePlayer,
    nameMutation: 'createPlayer',
    nameVariable: 'player',
  });

  return {
    ...useCreateEntity,
  };
};
