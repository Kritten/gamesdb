import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';

@ObjectType()
export class GamesTimePlayedItem {
  @Field(() => ID)
  id: number;

  name: string;

  @Field(() => Int)
  timePlayed: number;
}

@ObjectType()
export class GamesTimePlayedCollectionDataModel extends CollectionData {
  items: GamesTimePlayedItem[];
}
