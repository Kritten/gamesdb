import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Session } from './session.entity';
import { SessionEntityService } from './session.entity.service';
import { SessionInput, UpdateSessionInput } from './session.input';
import { GameEntityService } from '../game/game.entity.service';
import { PlayerEntityService } from '../player/player.entity.service';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { PlaytimeEntityService } from '../playtime/playtime.entity.service';
import { SessionCollectionService } from './collection/session.collection.service';
import { SessionCollectionData } from './collection/session.collectionData';
import { Playtime } from '../playtime/playtime.entity';
import { InputCollection } from '../../utilities/collection/collection.input';

@Resolver(() => Session)
export class SessionResolver extends EntityResolver {
  constructor(
    private sessionService: SessionEntityService,
    private sessionCollectionService: SessionCollectionService,
    private playerService: PlayerEntityService,
    private gameService: GameEntityService,
    private playtimeService: PlaytimeEntityService,
  ) {
    super();
  }

  @Query(() => SessionCollectionData)
  @UseGuards(GqlAuthGuard)
  async sessions(@Args('sessionData') data: InputCollection) {
    return this.sessionCollectionService.loadPage(data);
  }

  @Query(() => Session)
  @UseGuards(GqlAuthGuard)
  async session(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.sessionService.findOne(parseInt(id, 10));
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async createSession(@Args('sessionData') sessionData: SessionInput) {
    const session = new Session();
    session.comment = sessionData.comment;
    session.isChallenge = sessionData.isChallenge;
    session.isVirtual = sessionData.isVirtual;

    await this.handleRelation(
      'players',
      session,
      sessionData,
      this.playerService,
    );
    await this.handleRelation(
      'winners',
      session,
      sessionData,
      this.playerService,
    );
    await this.handleRelation('game', session, sessionData, this.gameService);

    const sessionCreated = (await this.sessionService.create(
      session,
    )) as Session;

    sessionCreated.playtimes = (await this.playtimeService.create(
      sessionData.playtimes.map(playtimeData => {
        const playtime = new Playtime();
        playtime.session = sessionCreated as Session;
        playtime.start = playtimeData.start;
        playtime.end = playtimeData.end;
        return playtime;
      }),
    )) as Playtime[];

    return sessionCreated;
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async updateSession(@Args('sessionData') sessionData: UpdateSessionInput) {
    const session = new Session();
    session.id = parseInt(sessionData.id, 10);
    session.comment = sessionData.comment;
    session.isChallenge = sessionData.isChallenge;
    session.isVirtual = sessionData.isVirtual;

    await this.handleRelation(
      'players',
      session,
      sessionData,
      this.playerService,
    );
    await this.handleRelation(
      'winners',
      session,
      sessionData,
      this.playerService,
    );
    await this.handleRelation('game', session, sessionData, this.gameService);

    const sessionUpdated = (await this.sessionService.update(
      session,
    )) as Session;

    /**
     * Handling playtimes
     */
    // Delete deleted playtimes
    const setKeptPlaytimes = sessionData.playtimes.reduce((set, value) => {
      if (value.id !== undefined) {
        set.add(parseInt(value.id, 10));
      }
      return set;
    }, new Set<number>());

    const playtimesToBeDeleted = sessionUpdated.playtimes.filter(
      playtime => !setKeptPlaytimes.has(playtime.id),
    );

    if (playtimesToBeDeleted.length > 0) {
      await this.playtimeService.delete(
        playtimesToBeDeleted.map(playtime => playtime.id),
      );
    }

    // Add new playtimes
    await this.playtimeService.create(
      sessionData.playtimes
        .filter(playtime => playtime.id === undefined)
        .map(playtimeData => {
          const playtime = new Playtime();
          playtime.session = session;
          playtime.start = playtimeData.start;
          playtime.end = playtimeData.end;
          return playtime;
        }),
    );

    // Update existing playtimes
    await this.playtimeService.update(
      sessionData.playtimes
        .filter(playtime => playtime.id !== undefined)
        .map(playtimeData => {
          const playtime = new Playtime();
          playtime.id = parseInt(playtimeData.id, 10);
          playtime.session = session;
          playtime.start = playtimeData.start;
          playtime.end = playtimeData.end;
          return playtime;
        }),
    );

    sessionUpdated.playtimes = await this.playtimeService.find({
      where: {
        session: sessionUpdated,
      },
    });

    return sessionUpdated;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteSession(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.sessionService.delete(parseInt(id, 10));
  }
}
