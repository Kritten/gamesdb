import { Player } from '@/modules/player/player.model';
import { computed, ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { compareDesc } from 'date-fns';

const players = ref<Record<ID, Player>>({});
const playersSortedByLastPlayed = computed(() => Object.values(players.value).sort(
  (playerA, playerB) => compareDesc(playerA.lastSession, playerB.lastSession),
));

export const usePlayers = () => ({
  players: playersSortedByLastPlayed,
  playerById: (id: ID) => players.value[id],
  setPlayers(playerPassed: Record<ID, Player>) {
    players.value = playerPassed;
  },
});
