import { Field, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';
import { Wishlist } from '../wishlist.entity';

@ObjectType()
export class WishlistCollectionData extends CollectionData {
  @Field(() => [Wishlist])
  items: Wishlist[];
}
