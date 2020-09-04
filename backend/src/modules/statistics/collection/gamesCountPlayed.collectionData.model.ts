import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';

@ObjectType()
export class GamesCountPlayedItem {
  @Field(() => ID)
  id: number;

  name: string;

  @Field(() => Int)
  countPlayed: number;
}

@ObjectType()
export class GamesCountPlayedCollectionDataModel extends CollectionData {
  items: GamesCountPlayedItem[];
}
