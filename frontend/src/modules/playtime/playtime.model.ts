import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { PlaytimeInterface } from '@/modules/playtime/playtime.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';

export class Playtime extends Entity implements PlaytimeInterface {
  start: Date;
  end: Date;

  constructor(data: PlaytimeInterface = {}) {
    super(data);
    const dateDefault = new Date();
    this.start = setDefaultIfNullOrUndefined<Date>(data.start, dateDefault);
    this.end = setDefaultIfNullOrUndefined<Date>(data.end, dateDefault);
  }
}
