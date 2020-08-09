import { EntityService } from '../../utilities/entity.service';
import { Rating } from './rating.entity';

export class RatingService extends EntityService<Rating> {
  constructor() {
    super(Rating, { relations: ['game', 'player'] });
  }
}
