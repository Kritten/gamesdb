import { Field, InputType, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class WishlistInput {
  @Field(() => ID)
  id?: string;
}

@InputType()
export class UpdateWishlistInput extends PartialType(WishlistInput) {
  @Field(() => ID)
  id: string;
}
