import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { RatingInterface } from '@/modules/rating/rating.types';

export class Rating extends Entity implements RatingInterface {
  rating?: number;

  constructor(data: RatingInterface = {}) {
    super(data);
    this.rating = data.rating;
  }
}
