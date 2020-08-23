import { Field, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../utilities/collection/collection.types';
import { Game } from './game.entity';

@ObjectType()
export class GameCollectionData extends CollectionData {
  @Field(() => [Game])
  items: Game[];
}
