import {Field, GraphQLISODateTime, ID, InputType, PartialType} from '@nestjs/graphql';

@InputType()
export class PlaytimeInput {
  @Field(() => ID)
  id?: string;

  start: Date;

  @Field(() => GraphQLISODateTime)
  end?: Date | null;

  @Field(() => ID)
  session: string;
}

@InputType()
export class UpdatePlaytimeInput extends PartialType(PlaytimeInput) {
  @Field(() => ID)
  id: string;
}
