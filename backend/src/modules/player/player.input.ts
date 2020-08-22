import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class PlayerInput {
  @Field(() => ID)
  id?: number;

  name: string;

  @Field(() => [ID])
  games?: number[];
}

@InputType()
export class UpdatePlayerInput extends PartialType(PlayerInput) {
  @Field(() => ID)
  id: number;
}
