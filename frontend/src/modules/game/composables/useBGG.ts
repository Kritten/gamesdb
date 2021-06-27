import { Game } from '@/modules/game/game.model';
import { BggClient } from 'boardgamegeekclient';
import { ref } from 'vue';
import { BggThingDto } from 'boardgamegeekclient/dist/dto';

const things = ref<Record<number, BggThingDto>>({});

export const useBGG = () => ({
  async loadInfoForGame(idBGG: number): Promise<BggThingDto | null> {
    if (idBGG === null) {
      return null;
    }

    if (things.value[idBGG] !== undefined) {
      return things.value[idBGG];
    }

    const client = BggClient.Create();

    const response = await client.thing.query({
      id: idBGG,
      type: 'boardgame',
      stats: 1,
    });

    if (response === undefined || response.length === 0) {
      return null;
    }

    const infoBGG = response[0];

    things.value[infoBGG.id] = infoBGG;

    return infoBGG;
  },
});
