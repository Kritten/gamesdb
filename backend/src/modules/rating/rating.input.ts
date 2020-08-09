import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class RatingInput {
  @Field(() => Int)
  id?: number;

  rating: number;

  @Field(() => Int)
  game: number;

  @Field(() => Int)
  player: number;
}

@InputType()
export class UpdateRatingInput extends PartialType(RatingInput) {
  @Field(() => Int)
  id: number;
}
