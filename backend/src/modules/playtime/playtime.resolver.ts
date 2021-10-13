import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Playtime } from './playtime.entity';
import { PlaytimeInput, UpdatePlaytimeInput } from './playtime.input';
import { InputCollection } from '../../utilities/collection/collection.input';
import { PlaytimeCollectionData } from './collection/playtime.collectionData';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Resolver(() => Playtime)
export class PlaytimeResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => PlaytimeCollectionData)
  @UseGuards(GqlAuthGuard)
  async playtimes(@Args('playtimeData') data: InputCollection) {
    // todo: loadPage
    return this.prismaService.playtime.findMany();
  }

  @Query(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async playtime(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.playtime.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async createPlaytime(@Args('playtimeData') playtimeData: PlaytimeInput) {
    return this.prismaService.playtime.create({
      data: {
        start: playtimeData.start,
        end: playtimeData.end,
        sessionId: parseInt(playtimeData.session, 10),
      }
    });
  }

  @Mutation(() => Playtime)
  @UseGuards(GqlAuthGuard)
  async updatePlaytime(
    @Args('playtimeData') playtimeData: UpdatePlaytimeInput,
  ) {
    return this.prismaService.playtime.update({
      where: { id: parseInt(playtimeData.id, 10) },
      data: {
        start: playtimeData.start,
        end: playtimeData.end,
        sessionId: parseInt(playtimeData.session, 10),
      }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePlaytime(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.playtime.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
