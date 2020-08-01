import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { GameInput, UpdateGameInput } from './game.input';
import { CategoryService } from '../category/category.service';
import { EntityResolver } from '../../utilities/entity.resolver';
import { MechanismService } from '../mechanism/mechanism.service';
import { MoodService } from '../mood/mood.service';
import { SessionService } from '../session/session.service';
import { UniverseService } from '../universe/universe.service';

@Resolver(() => Game)
export class GameResolver extends EntityResolver {
  constructor(
    private gameService: GameService,
    private categoryService: CategoryService,
    private universeService: UniverseService,
    private mechanismService: MechanismService,
    private moodService: MoodService,
    private sessionService: SessionService,
  ) {
    super();
  }

  @Query(() => [Game])
  @UseGuards(GqlAuthGuard)
  async games() {
    return this.gameService.find();
  }

  @Query(() => Game)
  @UseGuards(GqlAuthGuard)
  async game(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.gameService.findOne(id);
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard)
  async createGame(@Args('gameData') gameData: GameInput) {
    const game = new Game();
    game.name = gameData.name;
    game.description = gameData.description;
    game.description = gameData.description;
    game.countPlayersMin = gameData.countPlayersMin;
    game.countPlayersMax = gameData.countPlayersMax;
    game.minutesPlaytimeMin = gameData.minutesPlaytimeMin;
    game.minutesPlaytimeMax = gameData.minutesPlaytimeMax;
    game.isCoop = gameData.isCoop;
    game.complexity = gameData.complexity;
    game.size = gameData.size;
    //TODO relations
    return await this.gameService.create(game);
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard)
  async updateGame(@Args('gameData') gameData: UpdateGameInput) {
    const game = new Game();
    game.id = gameData.id;
    game.name = gameData.name;
    game.description = gameData.description;
    game.description = gameData.description;
    game.countPlayersMin = gameData.countPlayersMin;
    game.countPlayersMax = gameData.countPlayersMax;
    game.minutesPlaytimeMin = gameData.minutesPlaytimeMin;
    game.minutesPlaytimeMax = gameData.minutesPlaytimeMax;
    game.isCoop = gameData.isCoop;
    game.complexity = gameData.complexity;
    game.size = gameData.size;
    //TODO relations
    await this.handleRelation(
      'universes',
      game,
      gameData,
      this.universeService,
    );
    await this.handleRelation(
      'categories',
      game,
      gameData,
      this.categoryService,
    );
    await this.handleRelation(
      'mechanisms',
      game,
      gameData,
      this.mechanismService,
    );
    await this.handleRelation('moods', game, gameData, this.moodService);
    // await this.handleRelation('playableWith', game, gameData, this.Service);
    await this.handleRelation('expansions', game, gameData, this.gameService);
    await this.handleRelation('sessions', game, gameData, this.sessionService);

    return await this.gameService.update(game);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteGame(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.gameService.delete(id);
  }
}
