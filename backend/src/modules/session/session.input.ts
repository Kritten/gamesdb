import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
class SessionPlaytimeInput {
  start: Date;
  end: Date;
}

@InputType()
export class SessionInput {
  @Field(() => ID)
  id?: string;

  @Field(() => [ID])
  players?: string[];

  @Field(() => [ID])
  winners?: string[];

  @Field(() => ID)
  game?: string;

  @Field(() => [SessionPlaytimeInput])
  playtimes?: SessionPlaytimeInput[];
}

@InputType()
export class UpdateSessionInput extends PartialType(SessionInput) {
  @Field(() => ID)
  id: string;
}
