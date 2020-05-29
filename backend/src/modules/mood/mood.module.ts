import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mood } from './mood.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mood])],
})
export class MoodModule {}
