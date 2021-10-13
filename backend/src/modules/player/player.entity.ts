import { Session } from '../session/session.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Rating } from '../rating/rating.entity';

@ObjectType()
export class Player {
  @Field(() => ID)
  id: string;

  name: string;

  public lastSession?: Date | null;

  // @AfterLoad()
  // public async setLastSession() {
  //   const playtimes = await getConnection().query(`
  //     select
  //       distinct player.id, playtime.end
  //     from
  //       session
  //     inner join
  //       session_players_player
  //         on session_players_player.sessionId = session.id
  //     inner join
  //       player
  //         on player.id = session_players_player.playerId
  //     inner join
  //       playtime
  //         on playtime.sessionId =  session.id
  //     where player.id = ${this.id}
  //   `);
  //
  //   this.lastSession = max(playtimes.map(playtime => playtime.end));
  //   this.lastSession = isValid(this.lastSession) ? this.lastSession : null;
  // }

  @Field(() => [Session], { defaultValue: [] })
  sessionsPlayed: Session[];

  @Field(() => [Session], { defaultValue: [] })
  sessionsWon: Session[];

  @Field(() => [Rating], { defaultValue: [] })
  ratings: Rating[];
}
