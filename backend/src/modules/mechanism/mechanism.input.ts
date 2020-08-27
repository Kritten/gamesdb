import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class MechanismInput {
  @Field(() => ID)
  id?: string;

  name: string;

  @Field(() => [ID])
  games?: string[];
}

@InputType()
export class UpdateMechanismInput extends PartialType(MechanismInput) {
  @Field(() => ID)
  id: string;
}
