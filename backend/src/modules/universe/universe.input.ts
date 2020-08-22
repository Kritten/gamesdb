import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UniverseInput {
  @Field(() => ID)
  id?: number;

  name: string;

  @Field(() => [ID])
  games?: number[];
}

@InputType()
export class UpdateUniverseInput extends PartialType(UniverseInput) {
  @Field(() => ID)
  id: number;
}
