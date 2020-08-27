import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Universe } from './universe.entity';
import { UniverseService } from './universe.service';
import { UniverseInput, UpdateUniverseInput } from './universe.input';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { GameEntityService } from '../game/game.entity.service';

@Resolver(() => Universe)
export class UniverseResolver extends EntityResolver {
  constructor(
    private universeService: UniverseService,
    private gameService: GameEntityService,
  ) {
    super();
  }

  @Query(() => [Universe])
  @UseGuards(GqlAuthGuard)
  async universes() {
    return this.universeService.find();
  }

  @Query(() => Universe)
  @UseGuards(GqlAuthGuard)
  async universe(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.universeService.findOne(parseInt(id, 10));
  }

  @Mutation(() => Universe)
  @UseGuards(GqlAuthGuard)
  async createUniverse(@Args('universeData') universeData: UniverseInput) {
    const universe = new Universe();
    universe.name = universeData.name;
    await this.handleRelation(
      'games',
      universe,
      universeData,
      this.gameService,
    );

    return await this.universeService.create(universe);
  }

  @Mutation(() => Universe)
  @UseGuards(GqlAuthGuard)
  async updateUniverse(
    @Args('universeData') universeData: UpdateUniverseInput,
  ) {
    const universe = new Universe();
    universe.id = parseInt(universeData.id, 10);
    universe.name = universeData.name;
    await this.handleRelation(
      'games',
      universe,
      universeData,
      this.gameService,
    );

    return await this.universeService.update(universe);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUniverse(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.universeService.delete(parseInt(id, 10));
  }
}
