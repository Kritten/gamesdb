import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Game } from '../game/game.entity';

@Entity()
export class Universe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToOne(
    () => Game,
    game => game.universe,
  )
  @JoinTable()
  games: Game[];
}
