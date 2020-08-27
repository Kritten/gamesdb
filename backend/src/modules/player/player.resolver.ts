import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Player } from './player.entity';
import { PlayerService } from './player.service';
import { PlayerInput, UpdatePlayerInput } from './player.input';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { SessionEntityService } from '../session/session.entity.service';

@Resolver(() => Player)
export class PlayerResolver extends EntityResolver {
  constructor(
    private playerService: PlayerService,
    private sessionService: SessionEntityService,
  ) {
    super();
  }

  @Query(() => [Player])
  @UseGuards(GqlAuthGuard)
  async players() {
    return this.playerService.find();
  }

  @Query(() => Player)
  @UseGuards(GqlAuthGuard)
  async player(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.playerService.findOne(parseInt(id, 10));
  }

  @Mutation(() => Player)
  @UseGuards(GqlAuthGuard)
  async createPlayer(@Args('playerData') playerData: PlayerInput) {
    const player = new Player();
    player.name = playerData.name;
    await this.handleRelation(
      'sessionsPlayed',
      player,
      playerData,
      this.sessionService,
    );
    await this.handleRelation(
      'sessionsWon',
      player,
      playerData,
      this.sessionService,
    );

    return await this.playerService.create(player);
  }

  @Mutation(() => Player)
  @UseGuards(GqlAuthGuard)
  async updatePlayer(@Args('playerData') playerData: UpdatePlayerInput) {
    const player = new Player();
    player.id = parseInt(playerData.id, 10);
    player.name = playerData.name;
    await this.handleRelation(
      'sessionsPlayed',
      player,
      playerData,
      this.sessionService,
    );
    await this.handleRelation(
      'sessionsWon',
      player,
      playerData,
      this.sessionService,
    );

    return await this.playerService.update(player);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePlayer(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.playerService.delete(parseInt(id, 10));
  }
}
