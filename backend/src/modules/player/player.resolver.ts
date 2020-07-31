import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import {Player} from "./player.entity";
import {PlayerService} from "./player.service";
import {PlayerInput, UpdatePlayerInput} from "./player.input";

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private playerService: PlayerService) {
  }

  @Query(() => [Player])
  @UseGuards(GqlAuthGuard)
  async players() {
    return this.playerService.findAll();
  }

  @Mutation(() => Player)
  @UseGuards(GqlAuthGuard)
  async createPlayer(@Args('playerData') playerData: PlayerInput) {
    const player = new Player();
    player.name = playerData.name;
    //TODO relations
    return await this.playerService.create(player);
  }

  @Mutation(() => Player)
  @UseGuards(GqlAuthGuard)
  async updatePlayer(@Args('playerData') playerData: UpdatePlayerInput) {
    const player = new Player();
    player.id = playerData.id;
    player.name = playerData.name;
    //TODO relations
    return await this.playerService.update(player);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePlayer(@Args({name: 'id', type: () => Int}) idPlayer: number) {
    return await this.playerService.delete(idPlayer);
  }
}
