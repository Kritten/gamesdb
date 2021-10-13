import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Session } from './session.entity';
import {SessionInput, SessionInputDatabase, UpdateSessionInput} from './session.input';
import { SessionCollectionData } from './collection/session.collectionData';
import { Playtime } from '../playtime/playtime.entity';
import { InputCollection } from '../../utilities/collection/collection.input';
import {PrismaService} from "../../utilities/collection/prisma.service";
import {handleRelation} from "../../utilities/utilities";

@Resolver(() => Session)
export class SessionResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => SessionCollectionData)
  @UseGuards(GqlAuthGuard)
  async sessions(@Args('sessionData') data: InputCollection) {
    // TODO: load page
    return this.prismaService.session.findMany();
  }

  @Query(() => Session)
  @UseGuards(GqlAuthGuard)
  async session(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.session.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
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

    return this.prismaService.session.create({
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
          create: sessionData.players.map((id) => ({
            player: {
              connect: { id: parseInt(id, 10) },
            },
          })),
        },
      },
    });

    //TODO migrate to prisma
    // const sessionCreated = (await this.sessionService.create(
    //   session,
    // )) as Session;
    //
    // sessionCreated.playtimes = (await this.playtimeService.create(
    //   sessionData.playtimes.map(playtimeData => {
    //     const playtime = new Playtime();
    //     playtime.session = sessionCreated as Session;
    //     playtime.start = playtimeData.start;
    //     playtime.end = playtimeData.end;
    //     return playtime;
    //   }),
    // )) as Playtime[];
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async updateSession(@Args('sessionData') sessionData: UpdateSessionInput) {
    return this.prismaService.session.update({
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
      }
    });
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
