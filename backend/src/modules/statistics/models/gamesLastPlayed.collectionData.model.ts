import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Session } from 'src/modules/session/session.entity';
import { CollectionData } from '../../../utilities/collection/collection.types';

@ObjectType()
export class GamesLastPlayedItem {
  @Field(() => ID)
  id: number;

  name: string;

  @Field(() => Session)
  session: Session;
}

@ObjectType()
export class GamesLastPlayedCollectionDataModel extends CollectionData {
  items: GamesLastPlayedItem[];
}
