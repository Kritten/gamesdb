import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';

@ObjectType()
export class GraphItem {
  @Field(() => [Int])
  data: number[];
}

@ObjectType()
export class GraphCollectionDataModel extends CollectionData {
  items: GraphItem[];
}
