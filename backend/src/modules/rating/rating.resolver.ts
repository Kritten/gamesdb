import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Rating } from './rating.entity';
import { RatingInput, UpdateRatingInput } from './rating.input';
import { RatingCollectionData } from './collection/rating.collectionData';
import { InputCollection } from '../../utilities/collection/collection.input';
import {PrismaService} from "../../utilities/collection/prisma.service";
import {getOrderBy, getPagination, getWhere} from "../../utilities/utilities";
import {Prisma} from "@prisma/client";

type RatingFromDatabase = {
  id: number | string,
  rating: number,
  player: number,
  game: number
}

const mapItem = (item: RatingFromDatabase) => ({
  ...item,
  player: {id: item.player},
  game: {id: item.game, name: ''},
});

const mapItems = (items: Array<RatingFromDatabase>) => {
  return items.map(item => mapItem(item));
};

@Resolver(() => Rating)
export class RatingResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => RatingCollectionData)
  @UseGuards(GqlAuthGuard)
  async ratings(@Args('ratingData') data: InputCollection) {
    const where = getWhere(data);
    const orderBy = getOrderBy(data);
    const pagination = getPagination(data);

    const query = `
        SELECT
           entity.id,
           player.id as player,
           game.id as game,
           rating
        FROM
          rating as entity
          LEFT JOIN
            game
            ON entity.gameId = game.id
          LEFT JOIN
            player
            ON entity.playerId = player.id
        ${where}
        GROUP BY
            entity.id
        ${orderBy}
        ${pagination}
        `;

    const items = await this.prismaService.$queryRaw<Array<RatingFromDatabase>>(Prisma.raw(query));

    const count = (await this.prismaService.$queryRaw<Array<{count: number}>>(Prisma.raw(`
      SELECT 
        count(entity.id) as count
      FROM
        rating as entity
        LEFT JOIN
          game
          ON entity.gameId = game.id
        LEFT JOIN
          player
          ON entity.playerId = player.id
      ${where}
    `)))[0].count;

    return {
      items: mapItems(items),
      count
    };
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
