import {Field, ID, InputType, PartialType} from '@nestjs/graphql';
import {InputDatabaseRelation, Modify} from "../../utilities/types";

@InputType()
class SessionPlaytimeInput {
  start: Date;
  end?: Date | null;
}

@InputType()
class SessionPlaytimeUpdate {
  id?: string;
  start: Date;
  end?: Date | null;
}

@InputType()
export class SessionInput {
  comment?: string;

  isChallenge?: boolean;

  isVirtual?: boolean;

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

  @Field(() => [SessionPlaytimeUpdate])
  playtimes?: SessionPlaytimeUpdate[];
}

export type SessionInputDatabase = Modify<SessionInput, {
  gameId: number,
  players: InputDatabaseRelation,
  winners: InputDatabaseRelation,
}>;
