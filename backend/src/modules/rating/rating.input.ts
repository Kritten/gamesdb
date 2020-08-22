import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class RatingInput {
  @Field(() => ID)
  id?: number;

  @Field(() => Int)
  rating: number;

  @Field(() => ID)
  game: number;

  @Field(() => ID)
  player: number;
}

@InputType()
export class UpdateRatingInput extends PartialType(RatingInput) {
  @Field(() => ID)
  id: number;
}
