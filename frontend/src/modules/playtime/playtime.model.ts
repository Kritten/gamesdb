import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { PlaytimeInterface } from '@/modules/playtime/playtime.types';

export class Playtime extends Entity implements PlaytimeInterface {
  start?: Date;
  end?: Date;

  constructor(data: PlaytimeInterface = {}) {
    super(data);
    const dateDefault = new Date();
    this.start = data.start === undefined ? dateDefault : data.start;
    this.end = data.end === undefined ? dateDefault : data.end;
  }
}
