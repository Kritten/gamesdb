import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Mood } from './mood.entity';
import { MoodService } from './mood.service';
import { MoodInput, UpdateMoodInput } from './mood.input';
import { GameEntityService } from '../game/game.entity.service';
import { EntityResolver } from '../../utilities/entity/entity.resolver';

@Resolver(() => Mood)
export class MoodResolver extends EntityResolver {
  constructor(
    private moodService: MoodService,
    private gameService: GameEntityService,
  ) {
    super();
  }

  @Query(() => [Mood])
  @UseGuards(GqlAuthGuard)
  async moods() {
    return this.moodService.find();
  }

  @Query(() => Mood)
  @UseGuards(GqlAuthGuard)
  async mood(@Args({ name: 'id', type: () => ID }) id: number) {
    return this.moodService.findOne(id);
  }

  @Mutation(() => Mood)
  @UseGuards(GqlAuthGuard)
  async createMood(@Args('moodData') moodData: MoodInput) {
    const mood = new Mood();
    mood.name = moodData.name;
    await this.handleRelation('games', mood, moodData, this.gameService);

    return await this.moodService.create(mood);
  }

  @Mutation(() => Mood)
  @UseGuards(GqlAuthGuard)
  async updateMood(@Args('moodData') moodData: UpdateMoodInput) {
    const mood = new Mood();
    mood.id = moodData.id;
    mood.name = moodData.name;
    await this.handleRelation('games', mood, moodData, this.gameService);

    return await this.moodService.update(mood);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteMood(@Args({ name: 'id', type: () => ID }) id: number) {
    return await this.moodService.delete(id);
  }
}
