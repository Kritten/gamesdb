import { ref } from 'vue';
import { parse } from 'fast-xml-parser';

export type TypeBGGGameRaw = {
  id: number,
  name: {value: string},
  minplayers: {value: number},
  maxplayers: {value: number},
  minplaytime: {value: number},
  maxplaytime: {value: number},
  statistics: {
    ratings: {
      average: {value: number},
      averageweight: {value: number},
    }
  },
}

export type TypeBGGGame = {
  id: number,
  name: string,
  minplayers: number,
  maxplayers: number,
  minplaytime: number,
  maxplaytime: number,
  statistics: {
    ratings: {
      average: number,
      averageweight: number,
    }
  },
}

const things = ref<Record<number, TypeBGGGame>>({});

export const useBGG = () => ({
  async loadInfoForGame(idBGG: number): Promise<TypeBGGGame | null> {
    if (idBGG === null) {
      return null;
    }

    if (things.value[idBGG] !== undefined) {
      return things.value[idBGG];
    }

    const response = await fetch(`https://api.geekdo.com/xmlapi2/thing?id=${idBGG}&stats=1`);
    const text = await response.text();
    const responseParsed: {
      items: {
        item: TypeBGGGameRaw;
      }
    } = parse(text, {
      ignoreAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: true,
      attributeNamePrefix: '',
    }) as {
      items: {
        item: TypeBGGGameRaw;
      }
    };
    const { item } = responseParsed.items;

    if (response === undefined) {
      return null;
    }

    const infoBGG = {
      id: item.id,
      name: item.name.value,
      minplayers: item.minplayers.value,
      maxplayers: item.maxplayers.value,
      minplaytime: item.minplaytime.value,
      maxplaytime: item.maxplaytime.value,
      statistics: {
        ratings: {
          average: item.statistics.ratings.average.value,
          averageweight: item.statistics.ratings.averageweight.value,
        },
      },
    };

    things.value[infoBGG.id] = infoBGG;

    return infoBGG;
  },
});
