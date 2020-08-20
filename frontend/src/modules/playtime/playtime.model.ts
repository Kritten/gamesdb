import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { PlaytimeInterface } from '@/modules/playtime/playtime.types';

export class Playtime extends Entity implements PlaytimeInterface {
  constructor(data: PlaytimeInterface = {}) {
    super(data);
  }
}
