import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';
import { CategoryModule } from '../category/category.module';
import { UniverseModule } from '../universe/universe.module';
import { SessionModule } from '../session/session.module';
import { MechanismModule } from '../mechanism/mechanism.module';
import { MoodModule } from '../mood/mood.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    CategoryModule,
    UniverseModule,
    SessionModule,
    MechanismModule,
    MoodModule,
  ],
  providers: [GameResolver, GameService],
})
export class GameModule {}
