import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Universe } from './universe.entity';
import { UniverseResolver } from './universe.resolver';
import { UniverseService } from './universe.service';
import { GameModule } from '../game/game.module';

@Module({
  imports: [TypeOrmModule.forFeature([Universe]), forwardRef(() => GameModule)],
  providers: [UniverseResolver, UniverseService],
  exports: [UniverseService],
})
export class UniverseModule {}
