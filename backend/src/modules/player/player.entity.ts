import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  AfterLoad,
  getConnection,
} from 'typeorm';
import { Session } from '../session/session.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Rating } from '../rating/rating.entity';
import { OneToMany } from 'typeorm/index';
import {isValid, max} from 'date-fns';

@Entity()
@ObjectType()
export class Player {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  public lastSession?: Date | null;

  @AfterLoad()
  public async setLastSession() {
    const playtimes = await getConnection().query(`
      select
        distinct player.id, playtime.end
      from
        session
      inner join
        session_players_player
          on session_players_player.sessionId = session.id
      inner join
        player
          on player.id = session_players_player.playerId
      inner join
        playtime
          on playtime.sessionId =  session.id
      where player.id = ${this.id}
    `);

    this.lastSession = max(playtimes.map(playtime => playtime.end));
    this.lastSession = isValid(this.lastSession) ? this.lastSession : null;
  }

  @ManyToMany(
    () => Session,
    session => session.players,
  )
  @Field(() => [Session], { defaultValue: [] })
  sessionsPlayed: Session[];

  @ManyToMany(
    () => Session,
    session => session.winners,
  )
  @Field(() => [Session], { defaultValue: [] })
  sessionsWon: Session[];

  @OneToMany(
    () => Rating,
    rating => rating.player,
  )
  @Field(() => [Rating], { defaultValue: [] })
  ratings: Rating[];
}
