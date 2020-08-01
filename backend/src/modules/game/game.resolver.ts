import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { CurrentUser } from '../user/user-current.decorator';
import { User } from '../user/user.entity';
import {GameService} from "./game.service";
import {Game} from "./game.entity";
import {GameInput, UpdateGameInput} from "./game.input";
import {CategoryService} from "../category/category.service";
import {EntityResolver} from "../../utilities/entity.resolver";

@Resolver(() => Game)
export class GameResolver extends EntityResolver {
  constructor(private gameService: GameService, private categoryService: CategoryService) {
    super();
  }

  @Query(() => [Game])
  @UseGuards(GqlAuthGuard)
  async games(@CurrentUser() user: User) {
    return this.gameService.find();
  }

  @Query(() => Game)
  @UseGuards(GqlAuthGuard)
  async game(@Args({name: 'id', type: () => Int}) id: number) {
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
    await this.handleRelation('categories', game, gameData, this.categoryService);

    return await this.gameService.update(game);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteGame(@Args({name: 'id', type: () => Int}) id: number) {
    return await this.gameService.delete(id);
  }
}
