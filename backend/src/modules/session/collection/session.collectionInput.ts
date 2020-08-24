import { Field, ID, InputType } from '@nestjs/graphql';
import { InputCollection } from '../../../utilities/collection/collection.input';

@InputType()
export class SessionCollectionInput {
  @Field(() => InputCollection)
  collection: InputCollection;

  @Field(() => ID, { nullable: true })
  game?: number;
}
