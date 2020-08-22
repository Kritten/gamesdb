import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class MoodInput {
  @Field(() => ID)
  id?: number;

  name: string;

  @Field(() => [ID])
  games?: number[];
}

@InputType()
export class UpdateMoodInput extends PartialType(MoodInput) {
  @Field(() => ID)
  id: number;
}
