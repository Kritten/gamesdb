import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';
import { WishlistInput, UpdateWishlistInput } from './wishlist.input';

@Resolver(() => Wishlist)
export class WishlistResolver {
  constructor(private wishlistService: WishlistService) {}

  @Query(() => [Wishlist])
  @UseGuards(GqlAuthGuard)
  async wishlists() {
    return this.wishlistService.find();
  }

  @Query(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async wishlist(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.wishlistService.findOne(id);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async createWishlist(@Args('wishlistData') wishlistData: WishlistInput) {
    const wishlist = new Wishlist();
    //TODO relations
    return await this.wishlistService.create(wishlist);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async updateWishlist(
    @Args('wishlistData') wishlistData: UpdateWishlistInput,
  ) {
    const wishlist = new Wishlist();
    wishlist.id = parseInt(wishlistData.id);
    //TODO relations
    return await this.wishlistService.update(wishlist);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteWishlist(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.wishlistService.delete(id);
  }
}
