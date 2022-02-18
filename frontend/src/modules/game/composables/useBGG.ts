import { ref } from 'vue';
import { XMLParser } from 'fast-xml-parser';

export type TypeBGGGameRaw = {
    id: number;
    name: Array<{ value: string }>;
    minplayers: { value: number };
    maxplayers: { value: number };
    minplaytime: { value: number };
    maxplaytime: { value: number };
    statistics: {
        ratings: {
            average: { value: number };
            averageweight: { value: number };
        };
    };
    image: string;
};

export type TypeBGGGame = {
    id: number;
    name: string;
    minplayers: number;
    maxplayers: number;
    minplaytime: number;
    maxplaytime: number;
    statistics: {
        ratings: {
            average: number;
            averageweight: number;
        };
    };
    image: string;
};

const things = ref<Record<number, TypeBGGGame>>({});

const getName = (item: TypeBGGGameRaw) => item.name[0].value;

export const useBGG = () => ({
    async loadInfoForGame(idBGG: number): Promise<TypeBGGGame | null> {
        if (idBGG === null) {
            return null;
        }

        if (things.value[idBGG] !== undefined) {
            return things.value[idBGG];
        }

        const response = await fetch(
            `https://api.geekdo.com/xmlapi2/thing?id=${idBGG}&stats=1`
        );
        const text = await response.text();

        const parser = new XMLParser({
            ignoreAttributes: false,
            parseTagValue: true,
            parseAttributeValue: true,
            attributeNamePrefix: '',
        });

        const responseParsed: {
            items: {
                item: TypeBGGGameRaw;
            };
        } = parser.parse(text) as {
            items: {
                item: TypeBGGGameRaw;
            };
        };

        const { item } = responseParsed.items;

        if (response === undefined) {
            return null;
        }

        const infoBGG = {
            id: item.id,
            name: getName(item),
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
            image: item.image,
        };

        things.value[infoBGG.id] = infoBGG;

        return infoBGG;
    },
});
