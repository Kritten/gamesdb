import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { PlayerInterface } from '@/modules/player/player.types';

export class Player extends Entity implements PlayerInterface {
  name?: string;

  constructor(data: PlayerInterface = {}) {
    super(data);
    this.name = data.name;
  }
}
