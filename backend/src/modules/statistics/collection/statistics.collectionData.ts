import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';

@ObjectType()
export class Foo {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  countPlayed: number;
}

@ObjectType()
export class StatisticsCollectionData extends CollectionData {
  @Field(() => [Foo])
  items: Foo[];
}
