import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { RatingInterface } from '@/modules/rating/rating.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';

export class Rating extends Entity implements RatingInterface {
  rating: number;

  constructor(data: RatingInterface = {}) {
    super(data);
    this.rating = setDefaultIfNullOrUndefined<number>(data.rating, 0);
  }
}
