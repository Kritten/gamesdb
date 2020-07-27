import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { GameModel } from './game.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { CurrentUser } from '../user/user-current.decorator';
import { User } from '../user/user.entity';
import {GameService} from "./game.service";
import {Game} from "./game.entity";
import {GameInput} from "./game.input";

@Resolver(() => GameModel)
export class GameResolver {
  constructor(private gameService: GameService) {
  }

  @Query(() => [GameModel])
  @UseGuards(GqlAuthGuard)
  async games(@CurrentUser() user: User) {
    return this.gameService.findAll();
  }

  @Mutation(() => GameModel)
  @UseGuards(GqlAuthGuard)
  async createGame(@Args('gameData') gameData: GameInput) {
    const game = new Game();
    game.name = gameData.name;
    return await this.gameService.create(game);
  }
}
