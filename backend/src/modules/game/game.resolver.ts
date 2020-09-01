import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { GameEntityService } from './game.entity.service';
import { Game } from './game.entity';
import { GameInput, UpdateGameInput } from './game.input';
import { CategoryEntityService } from '../category/category.entity.service';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { MechanismEntityService } from '../mechanism/mechanism.entity.service';
import { MoodEntityService } from '../mood/mood.entity.service';
import { SessionEntityService } from '../session/session.entity.service';
import { UniverseEntityService } from '../universe/universe.entity.service';
import { InputCollection } from '../../utilities/collection/collection.input';
import { GameCollectionService } from './collection/game.collection.service';
import { GameCollectionData } from './collection/game.collectionData';
import { ImageEntityService } from '../image/image.entity.service';

@Resolver(() => Game)
export class GameResolver extends EntityResolver {
  constructor(
    private gameEntityService: GameEntityService,
    private gameCollectionService: GameCollectionService,
    private imageEntityService: ImageEntityService,
    private categoryService: CategoryEntityService,
    private universeService: UniverseEntityService,
    private mechanismService: MechanismEntityService,
    private moodService: MoodEntityService,
    private sessionService: SessionEntityService,
  ) {
    super();
  }

  @Query(() => GameCollectionData)
  @UseGuards(GqlAuthGuard)
  async games(@Args('gameData') data: InputCollection) {
    return this.gameCollectionService.loadPage(data);
  }

  @Query(() => Game)
  @UseGuards(GqlAuthGuard)
  async game(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.gameEntityService.findOne(parseInt(id, 10), {
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
    game.isDigital = gameData.isDigital;
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
    await this.handleRelation(
      'images',
      game,
      gameData,
      this.imageEntityService,
    );
    await this.handleRelation('sessions', game, gameData, this.sessionService);

    return await this.gameEntityService.create(game);
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard)
  async updateGame(@Args('gameData') gameData: UpdateGameInput) {
    const game = new Game();
    game.id = parseInt(gameData.id, 10);
    game.name = gameData.name;
    game.description = gameData.description;
    game.description = gameData.description;
    game.countPlayersMin = gameData.countPlayersMin;
    game.countPlayersMax = gameData.countPlayersMax;
    game.minutesPlaytimeMin = gameData.minutesPlaytimeMin;
    game.minutesPlaytimeMax = gameData.minutesPlaytimeMax;
    game.isCoop = gameData.isCoop;
    game.isDigital = gameData.isDigital;
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
    await this.handleRelation(
      'images',
      game,
      gameData,
      this.imageEntityService,
    );
    await this.handleRelation('sessions', game, gameData, this.sessionService);

    return await this.gameEntityService.update(game);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteGame(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.gameEntityService.delete(parseInt(id, 10));
  }
}
