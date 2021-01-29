export type GamesCountPlayedItem = {
  id: number;
  name: string;
  countPlayed: number;
};

export type GamesTimePlayedItem = {
  id: number;
  name: string;
  timePlayed: number;
};

export type GamesBestRatedItem = {
  id: number;
  name: string;
  rating?: number;
  count: number;
};
