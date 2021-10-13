import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Rating } from './rating.entity';
import { RatingInput, UpdateRatingInput } from './rating.input';
import { RatingCollectionData } from './collection/rating.collectionData';
import { InputCollection } from '../../utilities/collection/collection.input';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Resolver(() => Rating)
export class RatingResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => RatingCollectionData)
  @UseGuards(GqlAuthGuard)
  async ratings(@Args('ratingData') data: InputCollection) {
    // todo: loadPage
    return this.prismaService.rating.findMany();
  }

  @Query(() => Rating)
  @UseGuards(GqlAuthGuard)
  async rating(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.rating.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Rating)
  @UseGuards(GqlAuthGuard)
  async createRating(@Args('ratingData') ratingData: RatingInput) {
    return this.prismaService.rating.create({
      data: {
        rating: ratingData.rating,
        gameId: parseInt(ratingData.game, 10),
        playerId: parseInt(ratingData.player, 10),
      }
    });
  }

  @Mutation(() => Rating)
  @UseGuards(GqlAuthGuard)
  async updateRating(@Args('ratingData') ratingData: UpdateRatingInput) {
    return this.prismaService.rating.update({
      where: { id: parseInt(ratingData.id, 10) },
      data: {
        rating: ratingData.rating,
        gameId: parseInt(ratingData.game, 10),
        playerId: parseInt(ratingData.player, 10),
      }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteRating(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.rating.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
