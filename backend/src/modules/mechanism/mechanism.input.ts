import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class MechanismInput {
  @Field(() => Int)
  id?: number;

  name: string;

  @Field(() => [Int])
  games?: number[];
}

@InputType()
export class UpdateMechanismInput extends PartialType(MechanismInput) {
  @Field(() => Int)
  id: number;
}
