import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Mechanism } from './mechanism.entity';
import { MechanismInput, UpdateMechanismInput } from './mechanism.input';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Resolver(() => Mechanism)
export class MechanismResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => [Mechanism])
  @UseGuards(GqlAuthGuard)
  async mechanisms() {
    return this.prismaService.mechanism.findMany();
  }

  @Query(() => Mechanism)
  @UseGuards(GqlAuthGuard)
  async mechanism(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.mechanism.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Mechanism)
  @UseGuards(GqlAuthGuard)
  async createMechanism(@Args('mechanismData') mechanismData: MechanismInput) {
    return this.prismaService.mechanism.create({
      data: {
        name: mechanismData.name
      }
    });
  }

  @Mutation(() => Mechanism)
  @UseGuards(GqlAuthGuard)
  async updateMechanism(
    @Args('mechanismData') mechanismData: UpdateMechanismInput,
  ) {
    return this.prismaService.mechanism.update({
      where: { id: parseInt(mechanismData.id, 10) },
      data: {
        name: mechanismData.name
      }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteMechanism(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.mechanism.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
