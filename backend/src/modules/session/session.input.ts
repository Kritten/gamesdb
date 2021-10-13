import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import {InputDatabaseRelation, Modify} from "../../utilities/types";

@InputType()
class SessionPlaytimeInput {
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
}

export type SessionInputDatabase = Modify<SessionInput, {
  gameId: number,
  players: InputDatabaseRelation,
  winners: InputDatabaseRelation,
}>;
