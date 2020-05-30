import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameResolver } from './game.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameResolver],
})
export class GameModule {}
