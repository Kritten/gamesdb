import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Game } from '../game/game.entity';
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Universe {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToMany(
    () => Game,
    game => game.universes,
  )
  @JoinTable()
  @Field(() => [Game],{defaultValue: []})
  games: Game[];
}
