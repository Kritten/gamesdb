import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { MoodInterface } from '@/modules/mood/mood.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export class Mood extends Entity implements MoodInterface {
  name: string;

  constructor(data: MoodInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
  }

  static async parseFromServer(data: EntityInterface): Promise<Mood> {
    const entity = (await super.parseFromServer(data)) as Mood;

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.name = this.name;

    return data;
  }
}
