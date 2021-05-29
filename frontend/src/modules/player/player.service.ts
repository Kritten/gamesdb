import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import {
  mutationCreatePlayer,
  mutationDeletePlayer,
  mutationUpdatePlayer,
} from '@/modules/player/graphql/player.graphql';
import { Player } from '@/modules/player/player.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';
import { ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';

export class ServicePlayerClass implements ServiceEntityInterface<Player> {
  useCreate() {
    const player = ref(new Player());

    return {
      entity: player,
      create: async () => {
        const playerNew = await this.create(player.value);
        player.value = new Player();
        return playerNew;
      },
    };
  }

  useUpdate(playerPassed: Player) {
    const player = ref(cloneDeep(playerPassed));

    return {
      entity: player,
      update: async () => {
        player.value = cloneDeep(await this.update(player.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (player: Player) => this.delete(player),
    };
  }

  async create(player: Player) {
    const { mutate } = useMutation(mutationCreatePlayer);
    const response = await mutate({
      variables: {
        player,
      },
    });

    const playerNew = (await Player.parseFromServer(response.data.createPlayer));
    store.commit('modulePlayer/addPlayer', playerNew);

    return playerNew;
  }

  async update(player: Player) {
    const { mutate } = useMutation(mutationUpdatePlayer);
    const response = await mutate({
      variables: {
        player,
      },
    });

    const playerNew = (await Player.parseFromServer(response.data.updatePlayer));
    store.commit('modulePlayer/addPlayer', playerNew);

    return playerNew;
  }

  async delete(player: Player) {
    const { mutate } = useMutation(mutationDeletePlayer);
    const response = await mutate({
      variables: {
        id: player.id,
      },
    });

    store.commit('modulePlayer/deletePlayer', player);

    return response.data.deletePlayer;
  }
}

export const ServicePlayer = new ServicePlayerClass();
