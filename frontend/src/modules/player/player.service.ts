import { ref } from 'vue';
import {
  mutationCreatePlayer,
  mutationDeletePlayer,
  mutationUpdatePlayer,
} from '@/modules/player/graphql/player.graphql';
import { Player } from '@/modules/player/player.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';
import { ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { mutate } from '@/modules/app/utilities/helpers';
import { usePlayers } from '@/modules/player/composables/usePlayers';

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
    const response = await mutate<{createPlayer: Player}>(mutationCreatePlayer, {
      player: player.prepareForServer(),
    });

    const playerNew = (await Player.parseFromServer(response.createPlayer));

    usePlayers().setPlayer(playerNew);

    return playerNew;
  }

  async update(player: Player) {
    const response = await mutate<{updatePlayer: Player}>(mutationUpdatePlayer, {
      player: player.prepareForServer(),
    });

    const playerNew = (await Player.parseFromServer(response.updatePlayer));

    usePlayers().setPlayer(playerNew);

    return playerNew;
  }

  async delete(player: Player) {
    await mutate<{deletePlayer: Player}>(mutationDeletePlayer, {
      id: player.id,
    });

    usePlayers().deletePlayer(player);

    return true;
  }
}

export const ServicePlayer = new ServicePlayerClass();
