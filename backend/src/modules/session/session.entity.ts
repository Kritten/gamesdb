import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Player } from '../player/player.entity';
import { Game } from '../game/game.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime',
  })
  date: Date;

  @Column({
    type: 'int',
  })
  duration: number;

  @Column({
    type: 'tinyint',
  })
  rating: number;

  @ManyToMany(
    () => Player,
    player => player.sessionsPlayed,
  )
  @JoinTable()
  players: Player[];

  @ManyToMany(
    () => Player,
    player => player.sessionsWon,
  )
  @JoinTable()
  winners: Player[];

  @ManyToOne(
    () => Game,
    game => game.sessions,
  )
  @JoinTable()
  game: Game;
}
