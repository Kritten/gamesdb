import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Universe } from './universe.entity';
import { UniverseResolver } from './universe.resolver';
import { UniverseEntityService } from './universe.entity.service';
import { GameModule } from '../game/game.module';

@Module({
  imports: [TypeOrmModule.forFeature([Universe]), forwardRef(() => GameModule)],
  providers: [UniverseResolver, UniverseEntityService],
  exports: [UniverseEntityService],
})
export class UniverseModule {}
