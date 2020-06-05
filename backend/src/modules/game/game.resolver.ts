import { Query, Resolver } from '@nestjs/graphql';
import { GameType } from './game.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { CurrentUser } from '../user/user-current.decorator';
import { User } from '../user/user.entity';

@Resolver(() => GameType)
export class GameResolver {
  @Query(() => [GameType])
  @UseGuards(GqlAuthGuard)
  async game(@CurrentUser() user: User) {
    console.warn(user, 'user');
    return [];
  }
}
