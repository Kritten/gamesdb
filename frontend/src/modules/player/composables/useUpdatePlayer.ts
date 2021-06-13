import { Player } from '@/modules/player/player.model';
import { usePlayers } from '@/modules/player/composables/usePlayers';
import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { mutationUpdatePlayer } from '@/modules/player/graphql/player.graphql';

export const useUpdatePlayer = (playerPassed: Player) => {
  const useUpdateEntity = baseUseUpdateEntity<Player, { updatePlayer: Player }>({
    cls: Player,
    entityPassed: playerPassed,
    setEntity: usePlayers().setPlayer,
    mutation: mutationUpdatePlayer,
    nameMutation: 'updatePlayer',
    nameVariable: 'player',
  });

  return {
    ...useUpdateEntity,
  };
};
