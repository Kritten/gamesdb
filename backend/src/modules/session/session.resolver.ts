import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Session } from './session.entity';
import {SessionInput, SessionInputDatabase, UpdateSessionInput} from './session.input';
import { SessionCollectionData } from './collection/session.collectionData';
import { InputCollection } from '../../utilities/collection/collection.input';
import {PrismaService} from "../../utilities/collection/prisma.service";
import {getOrderBy, getPagination, getWhere, handleRelation, inputCollectionToPrisma} from "../../utilities/utilities";
import {Prisma} from "@prisma/client";

const include = {
  playtimes: true,
  players: {
    select: {
      player: {
        select: {
          id: true
        }
      }
    }
  },
  winners: {
    select: {
      player: {
        select: {
          id: true
        }
      }
    }
  },
  game: {
    select: {
      id: true,
    }
  }
};

const mapItem = (item: {players: Array<{ player: {id: number} }>, winners: Array<{ player: {id: number} }>}) => ({
  ...item,
  players: item.players.map(player => ({id: player.player.id})),
  winners: item.winners.map(player => ({id: player.player.id})),
});

const mapItems = (items: Array<{players: Array<{ player: {id: number} }>, winners: Array<{ player: {id: number} }>}>) => {
  return items.map(item => mapItem(item));
};

@Resolver(() => Session)
export class SessionResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => SessionCollectionData)
  @UseGuards(GqlAuthGuard)
  async sessions(@Args('sessionData') data: InputCollection) {
    const items = await this.prismaService.session.findMany({
      ...inputCollectionToPrisma(data),
      include,
    });

    return {
      items: mapItems(items),
      count: await this.prismaService.session.count(),
    }

    // const where = getWhere(data);
    // const orderBy = getOrderBy(data);
    // const pagination = getPagination(data);
    //
    // const query = `
    //     SELECT
    //          entity.id,
    //          entity.isChallenge,
    //          entity.isVirtual,
    //          entity.comment,
    //          entity.gameId
    //     FROM
    //       session as entity
    //     ${where}
    //     GROUP BY
    //         entity.id
    //     ${orderBy}
    //     ${pagination}
    //     `;
    // const items = await this.prismaService.$queryRaw<Array<Session & {gameId: number}>>(Prisma.raw(query));
    //
    // const count = (await this.prismaService.$queryRaw<Array<{count: number}>>(Prisma.raw(`
    //   SELECT
    //     count(entity.id) as count
    //   FROM
    //     session as entity
    //   ${where}
    // `)))[0].count;
    //
    // console.warn(items, "items");
    // console.log(count, "count");
    //
    // return {
    //   items: items.map(item => ({
    //     ...item,
    //     game: {
    //       id: item.gameId,
    //     }
    //   })),
    //   count,
    // };
  }

  @Query(() => Session)
  @UseGuards(GqlAuthGuard)
  async session(@Args({ name: 'id', type: () => ID }) id: string) {
    return mapItem(await this.prismaService.session.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include,
    }));
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async createSession(@Args('sessionData') sessionData: SessionInput) {
    // const sessionDatabase: SessionInputDatabase = {
    //   comment: sessionData.comment,
    //   isChallenge: sessionData.isChallenge,
    //   isVirtual: sessionData.isVirtual,
    //   gameId: parseInt(sessionData.game, 10),
    //   players: handleRelation({entities: sessionData.players}),
    //   winners: handleRelation({entities: sessionData.winners}),
    // };
    const session = await this.prismaService.session.create({
      // data: sessionDatabase,
      data: {
        comment: sessionData.comment,
        isChallenge: sessionData.isChallenge,
        isVirtual: sessionData.isVirtual,
        gameId: parseInt(sessionData.game, 10),
        players: {
          create: sessionData.players.map((id) => ({
            player: {
              connect: { id: parseInt(id, 10) },
            },
          })),
        },
        winners: {
          create: sessionData.winners.map((id) => ({
            player: {
              connect: { id: parseInt(id, 10) },
            },
          })),
        },
        playtimes: {
          createMany: {
            data: sessionData.playtimes,
          }
        }
      },
      include,
    });

    return mapItem(session);
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async updateSession(@Args('sessionData') sessionData: UpdateSessionInput) {
    return mapItem(await this.prismaService.session.update({
      where: { id: parseInt(sessionData.id, 10) },
      data: {
        comment: sessionData.comment,
        isChallenge: sessionData.isChallenge,
        isVirtual: sessionData.isVirtual,
        gameId: parseInt(sessionData.game, 10),
        players: {
          create: sessionData.players.map((id) => ({
            player: {
              connect: { id: parseInt(id, 10) },
            },
          })),
        },
        winners: {
          create: sessionData.players.map((id) => ({
            player: {
              connect: { id: parseInt(id, 10) },
            },
          })),
        },
        // playtimes: {
        //   createMany: {
        //     data: sessionData.playtimes,
        //   }
        // }
      },
      include,
    }));
    /**
     * TODO: Handling playtimes
     */
    // // Delete deleted playtimes
    // const setKeptPlaytimes = sessionData.playtimes.reduce((set, value) => {
    //   if (value.id !== undefined) {
    //     set.add(parseInt(value.id, 10));
    //   }
    //   return set;
    // }, new Set<number>());
    //
    // const playtimesToBeDeleted = sessionUpdated.playtimes.filter(
    //   playtime => !setKeptPlaytimes.has(playtime.id),
    // );
    //
    // if (playtimesToBeDeleted.length > 0) {
    //   await this.playtimeService.delete(
    //     playtimesToBeDeleted.map(playtime => playtime.id),
    //   );
    // }
    //
    // // Add new playtimes
    // await this.playtimeService.create(
    //   sessionData.playtimes
    //     .filter(playtime => playtime.id === undefined)
    //     .map(playtimeData => {
    //       const playtime = new Playtime();
    //       playtime.session = session;
    //       playtime.start = playtimeData.start;
    //       playtime.end = playtimeData.end;
    //       return playtime;
    //     }),
    // );
    //
    // // Update existing playtimes
    // await this.playtimeService.update(
    //   sessionData.playtimes
    //     .filter(playtime => playtime.id !== undefined)
    //     .map(playtimeData => {
    //       const playtime = new Playtime();
    //       playtime.id = parseInt(playtimeData.id, 10);
    //       playtime.session = session;
    //       playtime.start = playtimeData.start;
    //       playtime.end = playtimeData.end;
    //       return playtime;
    //     }),
    // );
    //
    // sessionUpdated.playtimes = await this.playtimeService.find({
    //   where: {
    //     session: sessionUpdated,
    //   },
    // });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteSession(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.session.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
