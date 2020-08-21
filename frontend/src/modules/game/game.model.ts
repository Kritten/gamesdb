import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { GameInterface } from '@/modules/game/game.types';

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

  constructor(data: GameInterface) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.countPlayersMin = data.countPlayersMin;
    this.countPlayersMax = data.countPlayersMax;
    this.minutesPlaytimeMin = data.minutesPlaytimeMin;
    this.minutesPlaytimeMax = data.minutesPlaytimeMax;
    this.isCoop = data.isCoop;
    this.complexity = data.complexity;
    this.size = data.size;
  }
}
