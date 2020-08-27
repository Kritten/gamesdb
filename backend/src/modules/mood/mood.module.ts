import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mood } from './mood.entity';
import { MoodEntityService } from './mood.entity.service';
import { MoodResolver } from './mood.resolver';
import { GameModule } from '../game/game.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mood]), forwardRef(() => GameModule)],
  providers: [MoodResolver, MoodEntityService],
  exports: [MoodEntityService],
})
export class MoodModule {}
