import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CollectionData {
  @Field(() => Int)
  count: number;
}
