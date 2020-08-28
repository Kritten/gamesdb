import { CollectionService } from '../../../utilities/collection/collection.service';
import { Injectable } from '@nestjs/common';
import { Rating } from '../rating.entity';
import { RatingEntityService } from '../rating.entity.service';

@Injectable()
export class RatingCollectionService extends CollectionService<Rating> {
  constructor(private ratingEntityService: RatingEntityService) {
    super(Rating, ratingEntityService);
  }
}
