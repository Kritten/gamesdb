import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';

@ObjectType()
export class GamesBestRatedItem {
  @Field(() => ID)
  id: number;

  name: string;

  @Field(() => Float)
  rating?: number;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class GamesBestRatedCollectionDataModel extends CollectionData {
  items: GamesBestRatedItem[];
}
