import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import {
  mutationCreatePlayer,
  mutationDeletePlayer,
  mutationUpdatePlayer,
} from '@/modules/player/graphql/player.graphql';
import { Player } from '@/modules/player/player.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';

export class ServicePlayer {
  static useCreate() {
    let player = ref(new Player());

    return {
      player,
      create: async () => {
        await ServicePlayer.create(player.value);
        player.value = new Player();
      },
    };
  }

  static useUpdate(playerPassed: Player) {
    let player = ref(cloneDeep(playerPassed));

    return {
      player,
      update: async () => {
        player.value = cloneDeep(await ServicePlayer.update(player.value));
      },
    };
  }

  static useDelete() {
    return {
      delete: (player: Player) => ServicePlayer.delete(player),
    };
  }

  static async create(player: Player) {
    const response = await apolloClient.mutate({
      mutation: mutationCreatePlayer,
      variables: {
        player,
      },
    });

    const playerNew = Player.parseFromServer(response.data.createPlayer);
    store.commit('modulePlayer/addPlayer', playerNew);

    return playerNew;
  }

  static async update(player: Player) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdatePlayer,
      variables: {
        player,
      },
    });

    const playerNew = Player.parseFromServer(response.data.updatePlayer);
    store.commit('modulePlayer/addPlayer', playerNew);

    return playerNew;
  }

  static async delete(player: Player) {
    await apolloClient.mutate({
      mutation: mutationDeletePlayer,
      variables: {
        id: player.id,
      },
    });

    store.commit('modulePlayer/deletePlayer', player);
  }
}
