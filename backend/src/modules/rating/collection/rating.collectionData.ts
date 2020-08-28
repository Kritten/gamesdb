import { Field, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';
import { Rating } from '../rating.entity';

@ObjectType()
export class RatingCollectionData extends CollectionData {
  @Field(() => [Rating])
  items: Rating[];
}
