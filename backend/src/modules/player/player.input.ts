import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class PlayerInput {
  @Field(() => Int)
  id?: number;

  name: string;

  @Field(() => [Int])
  games?: number[];
}

@InputType()
export class UpdatePlayerInput extends PartialType(PlayerInput) {
  @Field(() => Int)
  id: number;
}
