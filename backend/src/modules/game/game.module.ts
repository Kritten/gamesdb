import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameResolver } from './game.resolver';
import {GameService} from "./game.service";
import {CategoryService} from "../category/category.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game]), CategoryService],
  providers: [GameResolver, GameService, CategoryService],
})
export class GameModule {}
