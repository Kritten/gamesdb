import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UniverseInput {
  @Field(() => ID)
  id?: string;

  name: string;

  @Field(() => [ID])
  games?: string[];
}

@InputType()
export class UpdateUniverseInput extends PartialType(UniverseInput) {
  @Field(() => ID)
  id: string;
}
