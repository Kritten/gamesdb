import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Wishlist } from './wishlist.entity';
import { WishlistEntityService } from './wishlist.entity.service';
import { WishlistInput, UpdateWishlistInput } from './wishlist.input';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { WishlistCollectionService } from './collection/rating.collection.service';
import { InputCollection } from '../../utilities/collection/collection.input';
import { WishlistCollectionData } from './collection/rating.collectionData';

@Resolver(() => Wishlist)
export class WishlistResolver extends EntityResolver {
  constructor(
    private wishlistService: WishlistEntityService,
    private wishlistCollectionService: WishlistCollectionService,
  ) {
    super();
  }

  @Query(() => WishlistCollectionData)
  async wishlists(@Args('wishlistData') data: InputCollection) {
    return this.wishlistCollectionService.loadPage(data);
  }

  @Mutation(() => Wishlist)
  async updateWishlistTaken(
    @Args('wishlistData') wishlistData: UpdateWishlistInput,
  ) {
    const wishlist = await this.wishlistService.findOne(
      parseInt(wishlistData.id, 10),
    );

    wishlist.taken = wishlistData.taken;

    return await this.wishlistService.update(wishlist);
  }

  @Query(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async wishlist(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.wishlistService.findOne(parseInt(id, 10));
  }

  @Mutation(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async createWishlist(@Args('wishlistData') wishlistData: WishlistInput) {
    const wishlist = new Wishlist();

    wishlist.name = wishlistData.name;
    wishlist.price = wishlistData.price;
    wishlist.taken = wishlistData.taken;
    wishlist.description = wishlistData.description;
    wishlist.link = wishlistData.link;
    wishlist.giftFor = wishlistData.giftFor;
    wishlist.images = wishlistData.images;

    return await this.wishlistService.create(wishlist);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async updateWishlist(
    @Args('wishlistData') wishlistData: UpdateWishlistInput,
  ) {
    const wishlist = new Wishlist();

    wishlist.id = parseInt(wishlistData.id);
    wishlist.name = wishlistData.name;
    wishlist.price = wishlistData.price;
    wishlist.taken = wishlistData.taken;
    wishlist.description = wishlistData.description;
    wishlist.link = wishlistData.link;
    wishlist.giftFor = wishlistData.giftFor;
    wishlist.images = wishlistData.images;

    return await this.wishlistService.update(wishlist);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteWishlist(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.wishlistService.delete(parseInt(id, 10));
  }
}
