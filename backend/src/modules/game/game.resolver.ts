import { Query, Resolver } from '@nestjs/graphql';
import { GameType } from './game.type';

@Resolver(() => GameType)
export class GameResolver {
  @Query(() => [GameType])
  async game() {
    return [];
  }
}
