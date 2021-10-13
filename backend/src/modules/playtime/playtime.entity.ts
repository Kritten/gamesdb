import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Session } from '../session/session.entity';

@ObjectType()
export class Playtime {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  start: Date;

  @Field(() => GraphQLISODateTime, {nullable: true})
  end: Date | null;

  @Field(() => Session)
  session: Session;
}
