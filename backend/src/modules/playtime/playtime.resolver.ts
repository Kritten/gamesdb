import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { Playtime } from './playtime.entity';
import { PlaytimeEntityService } from './playtime.entity.service';
import { PlaytimeInput, UpdatePlaytimeInput } from './playtime.input';
import { SessionService } from '../session/session.service';

@Resolver(() => Playtime)
export class PlaytimeResolver extends EntityResolver {
  constructor(
    private playtimeService: PlaytimeEntityService,
    private sessionService: SessionService,
  ) {
    super();
  }

  @Query(() => [Playtime])
  @UseGuards(GqlAuthGuard)
  async playtimes() {
    return this.playtimeService.find();
  }

  @Query(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async playtime(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.playtimeService.findOne(id);
  }

  @Mutation(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async createPlaytime(@Args('playtimeData') playtimeData: PlaytimeInput) {
    const playtime = new Playtime();
    playtime.start = playtimeData.start;
    playtime.end = playtimeData.end;
    await this.handleRelation(
      'session',
      playtime,
      playtimeData,
      this.sessionService,
    );

    return await this.playtimeService.create(playtime);
  }

  @Mutation(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async updatePlaytime(
    @Args('playtimeData') playtimeData: UpdatePlaytimeInput,
  ) {
    const playtime = new Playtime();
    playtime.id = playtimeData.id;
    playtime.start = playtimeData.start;
    playtime.end = playtimeData.end;
    await this.handleRelation(
      'session',
      playtime,
      playtimeData,
      this.sessionService,
    );

    return await this.playtimeService.update(playtime);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePlaytime(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.playtimeService.delete(id);
  }
}
