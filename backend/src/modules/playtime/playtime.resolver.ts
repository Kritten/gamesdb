import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Playtime } from './playtime.entity';
import { PlaytimeInput, UpdatePlaytimeInput } from './playtime.input';
import { InputCollection } from '../../utilities/collection/collection.input';
import { PlaytimeCollectionData } from './collection/playtime.collectionData';
import {PrismaService} from "../../utilities/collection/prisma.service";
import {getOrderBy, getPagination, getWhere} from "../../utilities/utilities";
import {Prisma} from "@prisma/client";

@Resolver(() => Playtime)
export class PlaytimeResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => PlaytimeCollectionData)
  @UseGuards(GqlAuthGuard)
  async playtimes(@Args('playtimeData') data: InputCollection) {
    const where = getWhere(data);
    const orderBy = getOrderBy(data);
    const pagination = getPagination(data);

    const query = `
        SELECT 
             entity.id,
             entity.start,
             entity.end
        FROM 
          playtime as entity
          LEFT JOIN
              session
              ON entity.sessionId = session.id
          LEFT JOIN
            game
            ON session.gameId = game.id
        ${where}
        GROUP BY
            entity.id
        ${orderBy}
        ${pagination}
        `;

    let items = await this.prismaService.$queryRaw<Array<Playtime>>(Prisma.raw(query));

    const count = (await this.prismaService.$queryRaw<Array<{count: number}>>(Prisma.raw(`
      SELECT 
        count(entity.id) as count
      FROM
          playtime as entity
      LEFT JOIN
        session
        ON entity.sessionId = session.id
      LEFT JOIN
        game
        ON session.gameId = game.id
      ${where}
    `)))[0].count;

    items = items.map(item => {
      item.start = new Date(item.start);

      if (item.end !== null) {
        item.end = new Date(item.end);
      }

      return item;
    })

    return {items, count};
  }


  @Query(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async playtime(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.playtime.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async createPlaytime(@Args('playtimeData') playtimeData: PlaytimeInput) {
    return this.prismaService.playtime.create({
      data: {
        start: playtimeData.start,
        end: playtimeData.end,
        sessionId: parseInt(playtimeData.session, 10),
      }
    });
  }

  @Mutation(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async updatePlaytime(
    @Args('playtimeData') playtimeData: UpdatePlaytimeInput,
  ) {
    return this.prismaService.playtime.update({
      where: { id: parseInt(playtimeData.id, 10) },
      data: {
        start: playtimeData.start,
        end: playtimeData.end,
        sessionId: parseInt(playtimeData.session, 10),
      }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePlaytime(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.playtime.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
