import { Field, ObjectType } from '@nestjs/graphql';
import { Session } from '../session.entity';
import { CollectionData } from '../../../utilities/collection/collection.types';

@ObjectType()
export class SessionCollectionData extends CollectionData {
  @Field(() => [Session])
  items: Session[];
}
