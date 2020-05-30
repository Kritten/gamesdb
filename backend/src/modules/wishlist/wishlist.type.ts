import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WishlistType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field()
  link: string;
}
