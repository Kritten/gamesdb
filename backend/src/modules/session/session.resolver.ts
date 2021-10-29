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
import {PlaytimeResolver} from "../playtime/playtime.resolver";

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

type SessionFromDatabase = {
  id: number,
  players: string
  winners: string,
  gameId: number,
}

const mapItem = (item: {players: Array<{ player: {id: number} }>, winners: Array<{ player: {id: number} }>}) => ({
  ...item,
  players: item.players.map(player => ({id: player.player.id})),
  winners: item.winners.map(player => ({id: player.player.id})),
});

const mapItemFromDatabase = (item: SessionFromDatabase) => ({
  ...item,
  game: { id: item.gameId },
  players: item.players.split(',').map(id => ({id,})),
  winners: item.winners.split(',').map(id => ({id,})),
});

const mapItemsFromDatabase = (items: Array<SessionFromDatabase>) => {
  return items.map(item => mapItemFromDatabase(item));
};

@Resolver(() => Session)
export class SessionResolver {
  constructor(
    private prismaService: PrismaService,
    private playtimeResolver: PlaytimeResolver,
  ) {
  }

  @Query(() => SessionCollectionData)
  @UseGuards(GqlAuthGuard)
  async sessions(@Args('sessionData') data: InputCollection) {
    const where = getWhere(data);
    const orderBy = getOrderBy(data);
    const pagination = getPagination(data);

    const query = `
        SELECT 
             entity.id,
             entity.comment,
             entity.isChallenge,
             entity.isVirtual,
             entity.gameId,
             group_concat(DISTINCT(player.id)) as players,
             group_concat(DISTINCT(winner.id)) as winners,
             MIN(playtime.start) as startMin,
             MAX(playtime.start) as startMax,
             MIN(playtime.end) as endMin,
             MAX(playtime.end) as endMax
        FROM 
          session as entity
          JOIN
            session_players_player
            ON entity.id = session_players_player.sessionId
          JOIN
            player
            ON session_players_player.playerId = player.id

          JOIN
            session_winners_player
            ON entity.id = session_winners_player.sessionId
          JOIN
            player as winner
            ON session_winners_player.playerId = winner.id
          LEFT JOIN
            playtime
            on entity.id = playtime.sessionId
          LEFT JOIN
            game
            on entity.gameId = game.id
        ${where}
        GROUP BY
            entity.id
        ${orderBy}
        ${pagination}
        `;

    let items = mapItemsFromDatabase(await this.prismaService.$queryRaw<Array<SessionFromDatabase>>(Prisma.raw(query)));

    items = await Promise.all(items.map(async (item) => {
      const playtimes = await this.playtimeResolver.playtimes({
        filters: [
          {
            field: 'sessionId',
            valueInt: item.id,
            operator: '=',
          }
        ],
        page: 1,
        count: null,
        sortBy: ['start'],
        sortDesc: [false],
      });

      return {
        ...item,
        playtimes: playtimes.items,
      };
    }));

    const count = (await this.prismaService.$queryRaw<Array<{count: number}>>(Prisma.raw(`
      SELECT
        count(entity.id) as count
      FROM
          session as entity
        LEFT JOIN
          game
          on entity.gameId = game.id
      ${where}
    `)))[0].count;

    return {items, count};
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
    const id = parseInt(sessionData.id, 10);

    const session = mapItem(await this.prismaService.session.update({
      where: { id, },
      data: {
        comment: sessionData.comment,
        isChallenge: sessionData.isChallenge,
        isVirtual: sessionData.isVirtual,
        gameId: parseInt(sessionData.game, 10),
        players: {
          deleteMany: {}
          // disconnect: {
          //   sessionId_playerId: {
          //
          //   }
          // }

          // set: [],
          // create: sessionData.players.map((id) => ({
          //   player: {
          //     connect: { id: parseInt(id, 10) },
          //   },
          // })),
        },
        winners: {
          deleteMany: {}
        //   create: sessionData.players.map((id) => ({
        //     player: {
        //       connect: { id: parseInt(id, 10) },
        //     },
        //   })),
        },
        playtimes: {
          deleteMany: {},
        //   createMany: {
        //     data: sessionData.playtimes,
        //   }
        }
      },
      include,
    }));

    console.warn(session, "sessionDeleted");

    await this.prismaService.session.update({
      where: { id },
      data: {
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
            data: sessionData.playtimes.map((playtime) => ({
              start: playtime.start,
              end: playtime.end,
            })),
          },
        },
      },
    });

    /**
     * TODO: Handling playtimes
     */
    // Delete deleted playtimes
    // const setKeptPlaytimes = sessionData.playtimes.reduce((set, value) => {
    //   if (value.id !== undefined) {
    //     set.add(parseInt(value.id, 10));
    //   }
    //   return set;
    // }, new Set<number>());

    // const playtimes = await this.prismaService.playtime.findMany({
    //   where: {
    //     session: {
    //       id,
    //     }
    //   }
    // })
    // const playtimesToBeDeleted = playtimes.filter(
    //   playtime => !setKeptPlaytimes.has(playtime.id),
    // );

    // console.warn(setKeptPlaytimes, "setKeptPlaytimes");
    // console.log(playtimesToBeDeleted, "playtimesToBeDeleted");
    // console.log(playtimes, "playtimes");
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

    return mapItem(await this.prismaService.session.findUnique({
      where: {id},
      include,
    }));
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteSession(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.session.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
