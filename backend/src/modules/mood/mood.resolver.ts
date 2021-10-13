import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Mood } from './mood.entity';
import { MoodInput, UpdateMoodInput } from './mood.input';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Resolver(() => Mood)
export class MoodResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => [Mood])
  @UseGuards(GqlAuthGuard)
  async moods() {
    return this.prismaService.mood.findMany();
  }

  @Query(() => Mood)
  @UseGuards(GqlAuthGuard)
  async mood(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.mood.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Mood)
  @UseGuards(GqlAuthGuard)
  async createMood(@Args('moodData') moodData: MoodInput) {
    return this.prismaService.mood.create({
      data: {
        name: moodData.name
      }
    });
  }

  @Mutation(() => Mood)
  @UseGuards(GqlAuthGuard)
  async updateMood(@Args('moodData') moodData: UpdateMoodInput) {
    return this.prismaService.mood.update({
      where: { id: parseInt(moodData.id, 10) },
      data: {
        name: moodData.name
      }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteMood(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.mood.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
