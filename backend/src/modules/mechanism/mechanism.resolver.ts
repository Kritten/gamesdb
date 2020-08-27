import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Mechanism } from './mechanism.entity';
import { MechanismInput, UpdateMechanismInput } from './mechanism.input';
import { MechanismEntityService } from './mechanism.entity.service';
import { GameEntityService } from '../game/game.entity.service';
import { EntityResolver } from '../../utilities/entity/entity.resolver';

@Resolver(() => Mechanism)
export class MechanismResolver extends EntityResolver {
  constructor(
    private mechanismService: MechanismEntityService,
    private gameService: GameEntityService,
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
  async mechanism(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.mechanismService.findOne(parseInt(id, 10));
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
    mechanism.id = parseInt(mechanismData.id, 10);
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
  async deleteMechanism(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.mechanismService.delete(parseInt(id, 10));
  }
}
