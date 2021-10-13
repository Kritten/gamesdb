import {
  Field,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class Wishlist {
  @Field(() => ID)
  id: string;

  name: string;

  @Field(() => Int)
  price: number;

  taken?: boolean;

  description: string;

  link: string;

  giftFor: number;

  images: string;
}
