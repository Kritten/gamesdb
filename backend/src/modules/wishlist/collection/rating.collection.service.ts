import { CollectionService } from '../../../utilities/collection/collection.service';
import { Injectable } from '@nestjs/common';
import { Wishlist } from '../wishlist.entity';
import { WishlistEntityService } from '../wishlist.entity.service';

@Injectable()
export class WishlistCollectionService extends CollectionService<Wishlist> {
  constructor(private wishlistEntityService: WishlistEntityService) {
    super(Wishlist, wishlistEntityService);
  }
}
