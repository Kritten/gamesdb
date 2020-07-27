import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WishlistModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field()
  link: string;
}
