import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import {Universe} from "./universe.entity";
import {UniverseService} from "./universe.service";
import {UniverseInput, UpdateUniverseInput} from "./universe.input";

@Resolver(() => Universe)
export class UniverseResolver {
  constructor(private universeService: UniverseService) {
  }

  @Query(() => [Universe])
  @UseGuards(GqlAuthGuard)
  async universes() {
    return this.universeService.find();
  }

  @Mutation(() => Universe)
  @UseGuards(GqlAuthGuard)
  async createUniverse(@Args('universeData') universeData: UniverseInput) {
    const universe = new Universe();
    universe.name = universeData.name;
    //TODO relations
    return await this.universeService.create(universe);
  }

  @Mutation(() => Universe)
  @UseGuards(GqlAuthGuard)
  async updateUniverse(@Args('universeData') universeData: UpdateUniverseInput) {
    const universe = new Universe();
    universe.id = universeData.id;
    universe.name = universeData.name;
    //TODO relations
    return await this.universeService.update(universe);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUniverse(@Args({name: 'id', type: () => Int}) idUniverse: number) {
    return await this.universeService.delete(idUniverse);
  }
}
