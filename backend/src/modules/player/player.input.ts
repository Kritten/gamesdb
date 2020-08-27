import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class PlayerInput {
  @Field(() => ID)
  id?: string;

  name: string;

  @Field(() => [ID])
  games?: string[];
}

@InputType()
export class UpdatePlayerInput extends PartialType(PlayerInput) {
  @Field(() => ID)
  id: string;
}
