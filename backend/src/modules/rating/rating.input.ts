import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class RatingInput {
  @Field(() => ID)
  id?: string;

  @Field(() => Int)
  rating: number;

  @Field(() => ID)
  game: string;

  @Field(() => ID)
  player: string;
}

@InputType()
export class UpdateRatingInput extends PartialType(RatingInput) {
  @Field(() => ID)
  id: string;
}
