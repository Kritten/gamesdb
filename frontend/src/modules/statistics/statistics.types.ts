import type { ID } from '@/modules/app/utilities/entity/entity.types';
import { GameLoading } from '@/modules/game/game.types';
import { Session } from '@/modules/session/session.model';

export type GamesCountPlayedItemServer = {
    id: ID;
    countPlayed: number;
};
export type GamesCountPlayedItem = {
    game: GameLoading;
    countPlayed: number;
};

export type GamesLastPlayedItemServer = {
    id: ID;
    session: Session;
};

export type GamesLastPlayedItem = {
    game: GameLoading;
    session: Session;
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
