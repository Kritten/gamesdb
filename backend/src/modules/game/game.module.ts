import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameResolver } from './game.resolver';
import {GameService} from "./game.service";
import {CategoryModule} from "../category/category.module";

@Module({
  imports: [TypeOrmModule.forFeature([Game]), CategoryModule],
  providers: [GameResolver, GameService],
})
export class GameModule {}
