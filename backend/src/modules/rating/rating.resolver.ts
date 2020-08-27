import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { Rating } from './rating.entity';
import { RatingEntityService } from './rating.entity.service';
import { RatingInput, UpdateRatingInput } from './rating.input';
import { PlayerEntityService } from '../player/player.entity.service';
import { GameEntityService } from '../game/game.entity.service';

@Resolver(() => Rating)
export class RatingResolver extends EntityResolver {
  constructor(
    private ratingService: RatingEntityService,
    private gameService: GameEntityService,
    private playerService: PlayerEntityService,
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
  async rating(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.ratingService.findOne(parseInt(id, 10));
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
    rating.id = parseInt(ratingData.id);
    rating.rating = ratingData.rating;
    await this.handleRelation('game', rating, ratingData, this.gameService);
    await this.handleRelation('player', rating, ratingData, this.playerService);

    return await this.ratingService.update(rating);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteRating(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.ratingService.delete(parseInt(id, 10));
  }
}
