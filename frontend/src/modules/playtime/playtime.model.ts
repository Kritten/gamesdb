import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { PlaytimeInterface } from '@/modules/playtime/playtime.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { parseISO } from 'date-fns';

export class Playtime extends Entity implements PlaytimeInterface {
  start: Date;

  end: Date;

  constructor(data: PlaytimeInterface = {}) {
    super(data);
    const dateDefault = new Date();
    this.start = setDefaultIfNullOrUndefined<Date>(data.start, dateDefault);
    this.end = setDefaultIfNullOrUndefined<Date>(data.end, dateDefault);
  }

  static async parseFromServer(data: EntityInterface): Promise<Playtime> {
    const entity = (await super.parseFromServer(data)) as Playtime;

    entity.start = parseISO((entity.start as unknown) as string);

    entity.end = parseISO((entity.end as unknown) as string);

    return entity;
  }
}
