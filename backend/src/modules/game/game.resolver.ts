import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { GameEntityService } from './game.entity.service';
import { Game } from './game.entity';
import { GameInput, UpdateGameInput } from './game.input';
import { CategoryService } from '../category/category.service';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { MechanismService } from '../mechanism/mechanism.service';
import { MoodService } from '../mood/mood.service';
import { SessionService } from '../session/session.service';
import { UniverseService } from '../universe/universe.service';
import { InputCollection } from '../../utilities/collection/collection.input';
import { GameCollectionService } from './game.collection.service';
import { CollectionData } from '../../utilities/collection/collection.types';

@Resolver(() => Game)
export class GameResolver extends EntityResolver {
  constructor(
    private gameEntityService: GameEntityService,
    private gameCollectionService: GameCollectionService,
    private categoryService: CategoryService,
    private universeService: UniverseService,
    private mechanismService: MechanismService,
    private moodService: MoodService,
    private sessionService: SessionService,
  ) {
    super();
  }

  @Query(() => CollectionData)
  @UseGuards(GqlAuthGuard)
  async games(@Args('gameData') data: InputCollection) {
    return this.gameCollectionService.loadPage(data);
  }

  @Query(() => Game)
  @UseGuards(GqlAuthGuard)
  async game(@Args({ name: 'id', type: () => ID }) id: number) {
    return this.gameEntityService.findOne(id, {
      // relations: ['ratings.game'],
    });
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
    await this.handleRelation(
      'playableWith',
      game,
      gameData,
      this.gameEntityService,
    );
    await this.handleRelation(
      'isExpansionOf',
      game,
      gameData,
      this.gameEntityService,
    );
    await this.handleRelation(
      'expansions',
      game,
      gameData,
      this.gameEntityService,
    );
    await this.handleRelation('sessions', game, gameData, this.sessionService);

    return await this.gameEntityService.create(game);
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
    await this.handleRelation(
      'playableWith',
      game,
      gameData,
      this.gameEntityService,
    );
    await this.handleRelation(
      'isExpansionOf',
      game,
      gameData,
      this.gameEntityService,
    );
    await this.handleRelation(
      'expansions',
      game,
      gameData,
      this.gameEntityService,
    );
    await this.handleRelation('sessions', game, gameData, this.sessionService);

    return await this.gameEntityService.update(game);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteGame(@Args({ name: 'id', type: () => ID }) id: number) {
    return await this.gameEntityService.delete(id);
  }
}
