import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class WishlistInput {
  @Field(() => Int)
  id?: number;

  name: string;

  @Field(() => [Int])
  games?: number[];
}

@InputType()
export class UpdateWishlistInput extends PartialType(WishlistInput) {
  @Field(() => Int)
  id: number;
}
