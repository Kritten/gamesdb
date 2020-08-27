import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class MoodInput {
  @Field(() => ID)
  id?: string;

  name: string;

  @Field(() => [ID])
  games?: string[];
}

@InputType()
export class UpdateMoodInput extends PartialType(MoodInput) {
  @Field(() => ID)
  id: string;
}
