import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Universe } from './universe.entity';
import {UniverseResolver} from "./universe.resolver";
import {UniverseService} from "./universe.service";

@Module({
  imports: [TypeOrmModule.forFeature([Universe])],
  providers: [UniverseResolver, UniverseService],
  exports: [UniverseService],
})
export class UniverseModule {}
