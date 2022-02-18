import { computed, ref } from 'vue';
import { compareDesc } from 'date-fns';
import { Player } from '@/modules/player/player.model';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';

const players = ref<Record<ID, Player>>({});
const playersSortedByLastPlayed = computed(() =>
    Object.values(players.value).sort((playerA, playerB) =>
        compareDesc(playerA.lastSession, playerB.lastSession)
    )
);

export const usePlayers = () => {
    const useEntity = baseUseEntity<Player>({
        entities: players,
    });

    return {
        setPlayers: useEntity.setEntities,
        setPlayer: useEntity.setEntity,
        deletePlayer: useEntity.deleteEntity,

        players: playersSortedByLastPlayed,
        playerById: (id: ID) => players.value[id],
    };
};
