import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { Playtime } from './playtime.entity';
import { PlaytimeEntityService } from './playtime.entity.service';
import { PlaytimeInput, UpdatePlaytimeInput } from './playtime.input';
import { SessionEntityService } from '../session/session.entity.service';
import { PlaytimeCollectionService } from './collection/playtime.collection.service';
import { InputCollection } from '../../utilities/collection/collection.input';
import { PlaytimeCollectionData } from './collection/playtime.collectionData';

@Resolver(() => Playtime)
export class PlaytimeResolver extends EntityResolver {
  constructor(
    private playtimeService: PlaytimeEntityService,
    private playtimeCollectionService: PlaytimeCollectionService,
    private sessionService: SessionEntityService,
  ) {
    super();
  }

  @Query(() => PlaytimeCollectionData)
  @UseGuards(GqlAuthGuard)
  async playtimes(@Args('playtimeData') data: InputCollection) {
    return this.playtimeCollectionService.loadPage(data);
  }

  @Query(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async playtime(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.playtimeService.findOne(parseInt(id, 10));
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
    playtime.id = parseInt(playtimeData.id, 10);
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
  async deletePlaytime(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.playtimeService.delete(parseInt(id, 10));
  }
}
