import { Session } from '../session/session.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Rating } from '../rating/rating.entity';

@ObjectType()
export class Player {
  @Field(() => ID)
  id: string;

  name: string;

  public lastSession?: Date | null;

  @Field(() => [Session], { defaultValue: [] })
  sessionsPlayed: Session[];

  @Field(() => [Session], { defaultValue: [] })
  sessionsWon: Session[];

  @Field(() => [Rating], { defaultValue: [] })
  ratings: Rating[];
}
