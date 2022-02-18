import type { ID } from '@/modules/app/utilities/entity/entity.types';
import { GameLoading } from '@/modules/game/game.types';

export type GamesCountPlayedItemServer = {
    id: ID;
    countPlayed: number;
};

export type GamesCountPlayedItem = {
    game: GameLoading;
    countPlayed: number;
};

export type GamesTimePlayedItemServer = {
    id: ID;
    timePlayed: number;
};

export type GamesTimePlayedItem = {
    game: GameLoading;
    timePlayed: number;
};

export type GamesBestRatedItem = {
    game: GameLoading;
};

export type GamesBestRatedItemServer = {
    id: string;
};
