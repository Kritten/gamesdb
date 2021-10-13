import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { User } from './user.entity';
import { CurrentUser } from './user-current.decorator';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
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

    return this.prismaService.user.findUnique({
      where: {
        id,
      }
    });
  }
}
