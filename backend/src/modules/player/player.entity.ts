import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Session } from '../session/session.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToMany(
    () => Session,
    session => session.players,
  )
  @JoinTable()
  sessionsPlayed: Session[];

  @ManyToMany(
    () => Session,
    session => session.winners,
  )
  @JoinTable()
  sessionsWon: Session[];
}
