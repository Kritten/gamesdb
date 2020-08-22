import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CurrentUser } from './user-current.decorator';

@Resolver(() => User)
export class UserResolver extends EntityResolver {
  constructor(private userService: UserService) {
    super();
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async user(
    @CurrentUser() user: User,
    @Args({ name: 'id', type: () => ID, nullable: true }) id: number,
  ) {
    if (id === undefined) {
      return user;
    }

    return this.userService.findOne(id);
  }
}
