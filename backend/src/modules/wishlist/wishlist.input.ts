import { Field, InputType, ID, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class WishlistInput {
  @Field(() => ID)
  id?: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  taken?: boolean;

  @Field(() => String)
  description: string;

  @Field(() => String)
  link: string;

  @Field(() => Int)
  giftFor: number;

  @Field(() => [ID])
  images?: string[];
}

@InputType()
export class UpdateWishlistInput extends PartialType(WishlistInput) {
  @Field(() => ID)
  id: string;
}
