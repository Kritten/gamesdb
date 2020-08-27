import { Mood } from './mood.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class MoodEntityService extends EntityService<Mood> {
  constructor() {
    super(Mood, { relations: ['games'] });
  }
}
