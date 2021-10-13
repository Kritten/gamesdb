import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Universe } from './universe.entity';
import { UniverseInput, UpdateUniverseInput } from './universe.input';
import {PrismaService} from "../../utilities/collection/prisma.service";
import {handleRelation} from "../../utilities/utilities";

@Resolver(() => Universe)
export class UniverseResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => [Universe])
  @UseGuards(GqlAuthGuard)
  async universes() {
    return this.prismaService.universe.findMany();
  }

  @Query(() => Universe)
  @UseGuards(GqlAuthGuard)
  async universe(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.universe.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Universe)
  @UseGuards(GqlAuthGuard)
  async createUniverse(@Args('universeData') universeData: UniverseInput) {
    return this.prismaService.universe.create({
      data: {
        name: universeData.name,
      }
    });
  }

  @Mutation(() => Universe)
  @UseGuards(GqlAuthGuard)
  async updateUniverse(
    @Args('universeData') universeData: UpdateUniverseInput,
  ) {
    return this.prismaService.universe.update({
      where: { id: parseInt(universeData.id, 10) },
      data: {
        name: universeData.name,
      }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUniverse(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.universe.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
