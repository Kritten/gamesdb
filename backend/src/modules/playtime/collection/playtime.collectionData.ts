import { Field, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';
import { Playtime } from '../playtime.entity';

@ObjectType()
export class PlaytimeCollectionData extends CollectionData {
  @Field(() => [Playtime])
  items: Playtime[];
}
