import { EntityService } from '../../utilities/entity/entity.service';
import { Rating } from './rating.entity';

export class RatingEntityService extends EntityService<Rating> {
  constructor() {
    super(Rating, { relations: ['game', 'player'] });
  }
}
