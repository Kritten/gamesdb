import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { MoodInterface } from '@/modules/mood/mood.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';

export class Mood extends Entity implements MoodInterface {
  name: string;

  constructor(data: MoodInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
  }
}
