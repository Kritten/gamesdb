import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Session } from './session.entity';
import { SessionEntityService } from './session.entity.service';
import { SessionInput, UpdateSessionInput } from './session.input';
import { GameEntityService } from '../game/game.entity.service';
import { PlayerService } from '../player/player.service';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { PlaytimeEntityService } from '../playtime/playtime.entity.service';
import { SessionCollectionService } from './session.collection.service';
import { InputCollection } from '../../utilities/collection/collection.input';
import { SessionCollectionData } from './session.collectionData';
import { Playtime } from '../playtime/playtime.entity';

@Resolver(() => Session)
export class SessionResolver extends EntityResolver {
  constructor(
    private sessionService: SessionEntityService,
    private sessionCollectionService: SessionCollectionService,
    private playerService: PlayerService,
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
  async session(@Args({ name: 'id', type: () => ID }) id: number) {
    return this.sessionService.findOne(id);
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async createSession(@Args('sessionData') sessionData: SessionInput) {
    const session = new Session();
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
    session.id = sessionData.id;
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
    await this.handleRelation(
      'playtimes',
      session,
      sessionData,
      this.playtimeService,
    );
    await this.handleRelation('game', session, sessionData, this.gameService);

    return await this.sessionService.update(session);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteSession(@Args({ name: 'id', type: () => ID }) id: number) {
    return await this.sessionService.delete(id);
  }
}
