import { Wishlist } from './wishlist.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class WishlistEntityService extends EntityService<Wishlist> {
  constructor() {
    super(Wishlist, {
      relations: ['images'],
    });
  }
}
