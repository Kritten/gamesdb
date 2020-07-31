import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import {Mood} from "./mood.entity";
import {MoodService} from "./mood.service";
import {MoodInput, UpdateMoodInput} from "./mood.input";

@Resolver(() => Mood)
export class MoodResolver {
  constructor(private moodService: MoodService) {
  }

  @Query(() => [Mood])
  @UseGuards(GqlAuthGuard)
  async moods() {
    return this.moodService.find();
  }

  @Query(() => Mood)
  @UseGuards(GqlAuthGuard)
  async mood(@Args({name: 'id', type: () => Int}) id: number) {
    return this.moodService.findOne(id);
  }

  @Mutation(() => Mood)
  @UseGuards(GqlAuthGuard)
  async createMood(@Args('moodData') moodData: MoodInput) {
    const mood = new Mood();
    mood.name = moodData.name;
    //TODO relations
    return await this.moodService.create(mood);
  }

  @Mutation(() => Mood)
  @UseGuards(GqlAuthGuard)
  async updateMood(@Args('moodData') moodData: UpdateMoodInput) {
    const mood = new Mood();
    mood.id = moodData.id;
    mood.name = moodData.name;
    //TODO relations
    return await this.moodService.update(mood);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteMood(@Args({name: 'id', type: () => Int}) id: number) {
    return await this.moodService.delete(id);
  }
}
