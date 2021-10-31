import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Wishlist } from './wishlist.entity';
import { WishlistInput, UpdateWishlistInput } from './wishlist.input';
import { InputCollection } from '../../utilities/collection/collection.input';
import { WishlistCollectionData } from './collection/rating.collectionData';
import {PrismaService} from "../../utilities/collection/prisma.service";
import {getQuery} from "../../utilities/utilities";
import {Prisma} from "@prisma/client";

const queryWishlists = (data: Partial<InputCollection> = {}, extractCount = false) => getQuery(`
    SELECT
      COUNT(DISTINCT entity.id) as count,
      entity.id,
      entity.name,
      entity.description,
      entity.link,
      entity.images,
      entity.giftFor,
      entity.taken,
      entity.price
    FROM
        wishlist as entity
`, data, extractCount);

const queryWishlist = (id: string | number) => {
  return queryWishlists({
    filters: [
      {
        field: 'entity.id',
        valueInt: typeof id === 'number' ? id : parseInt(id, 10),
        operator: '=',
      }
    ]
  });
}

type WishlistFromDatabase = {
  id: number,
  count: number,
  name: string,
  description: string,
  link: string,
  images: string,
  giftFor: string,
  taken: boolean,
  price: number,
}

@Resolver(() => Wishlist)
export class WishlistResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => WishlistCollectionData)
  async wishlists(@Args('wishlistData') data: InputCollection) {
    data.filters.map((filter) => {
      if (filter.valueRange !== undefined) {
        if (filter.valueRange[0] === 0) {
          filter.valueRange[0] = null;
        }

        if (filter.valueRange[1] === 100) {
          filter.valueRange[1] = null;
        }
      }
    });

    const items = await this.prismaService.$queryRaw<Array<WishlistFromDatabase>>(Prisma.raw(queryWishlists(data)));

    const count = await this.prismaService.$queryRaw<Array<WishlistFromDatabase>>(Prisma.raw(queryWishlists(data, true)));

    return {items, count: count[0].count};
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
    return (await this.prismaService.$queryRaw<WishlistFromDatabase>(Prisma.raw(queryWishlist(id))))[0];
  }

  @Mutation(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async createWishlist(@Args('wishlistData') wishlistData: WishlistInput) {
    const wishlist = await this.prismaService.wishlist.create({
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

    return (await this.prismaService.$queryRaw<WishlistFromDatabase>(Prisma.raw(queryWishlist(wishlist.id))))[0];
  }

  @Mutation(() => Wishlist)
  @UseGuards(GqlAuthGuard)
  async updateWishlist(
    @Args('wishlistData') wishlistData: UpdateWishlistInput,
  ) {
    await this.prismaService.wishlist.update({
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

    return (await this.prismaService.$queryRaw<WishlistFromDatabase>(Prisma.raw(queryWishlist(wishlistData.id))))[0];
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteWishlist(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.wishlist.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
