import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { GameInterface } from '@/modules/game/game.types';
import { Universe } from '@/modules/universe/universe.model';
import { Category } from '@/modules/category/category.model';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { Mood } from '@/modules/mood/mood.model';
import { Image } from '@/modules/image/image.model';
import { Rating } from '@/modules/rating/rating.model';

export class Game extends Entity implements GameInterface {
  name?: string;
  description?: string;
  countPlayersMin?: number;
  countPlayersMax?: number;
  minutesPlaytimeMin?: number;
  minutesPlaytimeMax?: number;
  isCoop?: boolean;
  complexity?: number;
  size?: number;
  universes?: Universe[];
  categories?: Category[];
  mechanisms?: Mechanism[];
  moods?: Mood[];
  images?: Image[];
  playableWith?: Game[];
  isExpansionOf?: Game;
  expansions?: Game[];
  ratings?: Rating[];

  constructor(data: GameInterface = {}) {
    super(data);
    this.name = data.name === undefined ? '' : data.name;
    this.description = data.description === undefined ? '' : data.description;
    this.countPlayersMin = data.countPlayersMin === undefined ? 0 : data.countPlayersMin;
    this.countPlayersMax = data.countPlayersMax === undefined ? 0 : data.countPlayersMax;
    this.minutesPlaytimeMin = data.minutesPlaytimeMin === undefined ? 0 : data.minutesPlaytimeMin;
    this.minutesPlaytimeMax = data.minutesPlaytimeMax === undefined ? 0 : data.minutesPlaytimeMax;
    this.isCoop = data.isCoop === undefined ? false : data.isCoop;
    this.complexity = data.complexity === undefined ? 0 : data.complexity;
    this.size = data.size === undefined ? 0 : data.size;
    this.universes = data.universes === undefined ? [] : data.universes;
    this.categories = data.categories === undefined ? [] : data.categories;
    this.mechanisms = data.mechanisms === undefined ? [] : data.mechanisms;
    this.moods = data.moods === undefined ? [] : data.moods;
    this.images = data.images === undefined ? [] : data.images;
    this.playableWith = data.playableWith === undefined ? [] : data.playableWith;
    this.isExpansionOf = data.isExpansionOf;
    this.expansions = data.expansions === undefined ? [] : data.expansions;
    this.ratings = data.ratings === undefined ? [] : data.ratings;
  }
}
