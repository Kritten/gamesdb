import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Player } from './player.entity';
import { PlayerInput, UpdatePlayerInput } from './player.input';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Resolver(() => Player)
export class PlayerResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => [Player])
  @UseGuards(GqlAuthGuard)
  async players() {
    return this.prismaService.player.findMany();
  }

  @Query(() => Player)
  @UseGuards(GqlAuthGuard)
  async player(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.player.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Player)
  @UseGuards(GqlAuthGuard)
  async createPlayer(@Args('playerData') playerData: PlayerInput) {
    return this.prismaService.player.create({
      data: {
        name: playerData.name
      }
    });
  }

  @Mutation(() => Player)
  @UseGuards(GqlAuthGuard)
  async updatePlayer(@Args('playerData') playerData: UpdatePlayerInput) {
    return this.prismaService.player.update({
      where: { id: parseInt(playerData.id, 10) },
      data: {
        name: playerData.name
      }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePlayer(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.player.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
