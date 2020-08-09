import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { EntityResolver } from '../../utilities/entity.resolver';
import { Rating } from './rating.entity';
import { RatingService } from './rating.service';
import { RatingInput, UpdateRatingInput } from './rating.input';
import { PlayerService } from '../player/player.service';
import { GameService } from '../game/game.service';

@Resolver(() => Rating)
export class RatingResolver extends EntityResolver {
  constructor(
    private ratingService: RatingService,
    private gameService: GameService,
    private playerService: PlayerService,
  ) {
    super();
  }

  @Query(() => [Rating])
  @UseGuards(GqlAuthGuard)
  async ratings() {
    return this.ratingService.find();
  }

  @Query(() => Rating)
  @UseGuards(GqlAuthGuard)
  async rating(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.ratingService.findOne(id);
  }

  @Mutation(() => Rating)
  @UseGuards(GqlAuthGuard)
  async createRating(@Args('ratingData') ratingData: RatingInput) {
    const rating = new Rating();
    rating.rating = ratingData.rating;
    await this.handleRelation('game', rating, ratingData, this.gameService);
    await this.handleRelation('player', rating, ratingData, this.playerService);

    return await this.ratingService.create(rating);
  }

  @Mutation(() => Rating)
  @UseGuards(GqlAuthGuard)
  async updateRating(@Args('ratingData') ratingData: UpdateRatingInput) {
    const rating = new Rating();
    rating.id = ratingData.id;
    rating.rating = ratingData.rating;
    await this.handleRelation('game', rating, ratingData, this.gameService);
    await this.handleRelation('player', rating, ratingData, this.playerService);

    return await this.ratingService.update(rating);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteRating(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.ratingService.delete(id);
  }
}
