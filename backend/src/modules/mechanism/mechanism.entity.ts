import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Game } from '../game/game.entity';

@Entity()
export class Mechanism {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToMany(
    () => Game,
    game => game.categories,
  )
  @JoinTable()
  games: Game[];
}
