import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mood } from './mood.entity';
import { MoodService } from './mood.service';
import { MoodResolver } from './mood.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Mood])],
  providers: [MoodResolver, MoodService],
  exports: [MoodService],
})
export class MoodModule {}
