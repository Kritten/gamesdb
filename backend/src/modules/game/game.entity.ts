import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Mechanism } from '../mechanism/mechanism.entity';
import { Mood } from '../mood/mood.entity';
import { Universe } from '../universe/universe.entity';
import { Session } from '../session/session.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'tinyint',
  })
  countPlayersMin: number;

  @Column({
    type: 'tinyint',
  })
  countPlayersMax: number;

  @Column({
    type: 'tinyint',
  })
  minutesPlaytimeMin: number;

  @Column({
    type: 'tinyint',
  })
  minutesPlaytimeMax: number;

  @Column({
    type: 'boolean',
  })
  isCoop: boolean;

  @Column({
    type: 'tinyint',
  })
  complexity: number;

  @Column({
    type: 'tinyint',
  })
  size: number;

  @OneToMany(
    () => Universe,
    universe => universe.games,
  )
  @JoinTable()
  universe: Universe;

  @ManyToMany(
    () => Category,
    category => category.games,
  )
  @JoinTable()
  categories: Category[];

  @ManyToMany(
    () => Mechanism,
    mechanism => mechanism.games,
  )
  @JoinTable()
  mechanisms: Mechanism[];

  @ManyToMany(
    () => Mood,
    mood => mood.games,
  )
  @JoinTable()
  moods: Mood[];

  @ManyToMany(() => Game)
  @JoinTable()
  playableWith: Game[];

  @ManyToOne(
    () => Game,
    game => game.expansions,
  )
  @JoinTable()
  isExpansionOf: Game;

  @OneToMany(
    () => Game,
    game => game.isExpansionOf,
  )
  @JoinTable()
  expansions: Game[];

  @OneToMany(
    () => Session,
    session => session.game,
  )
  @JoinTable()
  sessions: Session[];
}
