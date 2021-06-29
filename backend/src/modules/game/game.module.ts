import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameResolver } from './game.resolver';
import { GameEntityService } from './game.entity.service';
import { CategoryModule } from '../category/category.module';
import { UniverseModule } from '../universe/universe.module';
import { SessionModule } from '../session/session.module';
import { MechanismModule } from '../mechanism/mechanism.module';
import { MoodModule } from '../mood/mood.module';
import { GameCollectionService } from './collection/game.collection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    forwardRef(() => CategoryModule),
    forwardRef(() => UniverseModule),
    forwardRef(() => SessionModule),
    forwardRef(() => MechanismModule),
    forwardRef(() => MoodModule),
  ],
  providers: [GameResolver, GameEntityService, GameCollectionService],
  exports: [GameEntityService],
})
export class GameModule {}
