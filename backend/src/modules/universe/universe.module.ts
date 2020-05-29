import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Universe } from './universe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Universe])],
})
export class UniverseModule {}
