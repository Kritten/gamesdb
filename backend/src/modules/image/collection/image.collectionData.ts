import { Field, ObjectType } from '@nestjs/graphql';
import { CollectionData } from '../../../utilities/collection/collection.types';
import { Image } from '../image.entity';

@ObjectType()
export class ImageCollectionData extends CollectionData {
  @Field(() => [Image])
  items: Image[];
}
