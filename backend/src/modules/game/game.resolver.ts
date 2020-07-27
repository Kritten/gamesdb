import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { GameType } from './game.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { CurrentUser } from '../user/user-current.decorator';
import { User } from '../user/user.entity';
import {GameService} from "./game.service";
import {Game} from "./game.entity";
import {GameInput} from "./game.inputTypes";

@Resolver(() => GameType)
export class GameResolver {
  constructor(private gameService: GameService) {
  }

  @Query(() => [GameType])
  @UseGuards(GqlAuthGuard)
  async games(@CurrentUser() user: User) {
    return this.gameService.findAll();
  }

  @Mutation(() => GameType)
  @UseGuards(GqlAuthGuard)
  async createGame(@Args('gameData') gameData: GameInput) {
    const game = new Game();
    game.name = gameData.name;
    return await this.gameService.create(game);
  }
}
