import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Wishlist } from './wishlist.entity';
import { WishlistInput, UpdateWishlistInput } from './wishlist.input';
import { InputCollection } from '../../utilities/collection/collection.input';
import { WishlistCollectionData } from './collection/rating.collectionData';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Resolver(() => Wishlist)
export class WishlistResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => WishlistCollectionData)
  async wishlists(@Args('wishlistData') data: InputCollection) {
    // todo: loadPage
    return this.prismaService.wishlist.findMany();
  }

  @Mutation(() => Wishlist)
  async updateWishlistTaken(
    @Args('wishlistData') wishlistData: UpdateWishlistInput,
  ) {
    return this.prismaService.wishlist.update({
      where: { id: parseInt(wishlistData.id, 10) },
      data: {
        taken: wishlistData.taken,
      }
    });
  }

  @Query(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async wishlist(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.wishlist.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async createWishlist(@Args('wishlistData') wishlistData: WishlistInput) {
    return this.prismaService.wishlist.create({
      data: {
        name: wishlistData.name,
        price: wishlistData.price,
        taken: wishlistData.taken,
        description: wishlistData.description,
        link: wishlistData.link,
        giftFor: wishlistData.giftFor,
        images: wishlistData.images,
      }
    });
  }

  @Mutation(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async updateWishlist(
    @Args('wishlistData') wishlistData: UpdateWishlistInput,
  ) {
    return this.prismaService.wishlist.update({
      where: { id: parseInt(wishlistData.id, 10) },
      data: {
        name: wishlistData.name,
        price: wishlistData.price,
        taken: wishlistData.taken,
        description: wishlistData.description,
        link: wishlistData.link,
        giftFor: wishlistData.giftFor,
        images: wishlistData.images,
      }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteWishlist(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.wishlist.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
