import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Mechanism } from './mechanism.entity';
import { MechanismInput, UpdateMechanismInput } from './mechanism.input';
import { MechanismService } from './mechanism.service';
import { GameService } from '../game/game.service';
import { EntityResolver } from '../../utilities/entity.resolver';

@Resolver(() => Mechanism)
export class MechanismResolver extends EntityResolver {
  constructor(
    private mechanismService: MechanismService,
    private gameService: GameService,
  ) {
    super();
  }

  @Query(() => [Mechanism])
  @UseGuards(GqlAuthGuard)
  async mechanisms() {
    return this.mechanismService.find();
  }

  @Query(() => Mechanism)
  @UseGuards(GqlAuthGuard)
  async mechanism(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.mechanismService.findOne(id);
  }

  @Mutation(() => Mechanism)
  @UseGuards(GqlAuthGuard)
  async createMechanism(@Args('mechanismData') mechanismData: MechanismInput) {
    const mechanism = new Mechanism();
    mechanism.name = mechanismData.name;
    await this.handleRelation(
      'games',
      mechanism,
      mechanismData,
      this.gameService,
    );

    return await this.mechanismService.create(mechanism);
  }

  @Mutation(() => Mechanism)
  @UseGuards(GqlAuthGuard)
  async updateMechanism(
    @Args('mechanismData') mechanismData: UpdateMechanismInput,
  ) {
    const mechanism = new Mechanism();
    mechanism.id = mechanismData.id;
    mechanism.name = mechanismData.name;
    await this.handleRelation(
      'games',
      mechanism,
      mechanismData,
      this.gameService,
    );

    return await this.mechanismService.update(mechanism);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteMechanism(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.mechanismService.delete(id);
  }
}
