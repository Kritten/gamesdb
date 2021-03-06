import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { PlayerInterface } from '@/modules/player/player.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { parseISO } from 'date-fns';

export class Player extends Entity implements PlayerInterface {
  name: string;

  lastSession: Date;

  constructor(data: PlayerInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
    this.lastSession = setDefaultIfNullOrUndefined<Date>(data.lastSession, new Date());
  }

  static async parseFromServer(data: EntityInterface): Promise<Player> {
    const entity = (await super.parseFromServer(data)) as Player;

    entity.lastSession = parseISO((entity.lastSession as unknown) as string);

    return entity;
  }
}
