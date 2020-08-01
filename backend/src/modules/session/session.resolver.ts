import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Session } from './session.entity';
import { SessionService } from './session.service';
import { SessionInput, UpdateSessionInput } from './session.input';

@Resolver(() => Session)
export class SessionResolver {
  constructor(private sessionService: SessionService) {}

  @Query(() => [Session])
  @UseGuards(GqlAuthGuard)
  async sessions() {
    return this.sessionService.find();
  }

  @Query(() => Session)
  @UseGuards(GqlAuthGuard)
  async session(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.sessionService.findOne(id);
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async createSession(@Args('sessionData') sessionData: SessionInput) {
    const session = new Session();
    session.date = sessionData.date;
    session.duration = sessionData.duration;
    //TODO relations
    return await this.sessionService.create(session);
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async updateSession(@Args('sessionData') sessionData: UpdateSessionInput) {
    const session = new Session();
    session.id = sessionData.id;
    session.date = sessionData.date;
    session.duration = sessionData.duration;
    //TODO relations
    return await this.sessionService.update(session);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteSession(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.sessionService.delete(id);
  }
}
