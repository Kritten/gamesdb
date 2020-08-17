import { Mood } from './mood.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class MoodService extends EntityService<Mood> {
  constructor() {
    super(Mood, { relations: ['games'] });
  }
}
