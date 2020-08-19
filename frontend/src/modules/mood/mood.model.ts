import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { MoodInterface } from '@/modules/mood/mood.types';

export class Mood extends Entity implements MoodInterface {
  name?: string;

  constructor(data: MoodInterface = {}) {
    super(data);
    this.name = data.name;
  }
}
