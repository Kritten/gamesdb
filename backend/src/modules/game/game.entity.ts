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
    nullable: true,
  })
  description: string;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  countPlayersMin: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  countPlayersMax: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  minutesPlaytimeMin: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  minutesPlaytimeMax: number;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  isCoop: boolean;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  complexity: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  size: number;

  @ManyToMany(
    () => Universe,
    universe => universe.games,
  )
  @JoinTable()
  universe: Universe[];

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
