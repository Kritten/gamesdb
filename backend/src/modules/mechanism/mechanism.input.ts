import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class MechanismInput {
  @Field(() => ID)
  id?: number;

  name: string;

  @Field(() => [ID])
  games?: number[];
}

@InputType()
export class UpdateMechanismInput extends PartialType(MechanismInput) {
  @Field(() => ID)
  id: number;
}
