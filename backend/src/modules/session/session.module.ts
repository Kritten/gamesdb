import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionResolver } from './session.resolver';
import { SessionEntityService } from './session.entity.service';
import { GameModule } from '../game/game.module';
import { PlayerModule } from '../player/player.module';
import { PlaytimeModule } from '../playtime/playtime.module';
import { SessionCollectionService } from './collection/session.collection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    forwardRef(() => GameModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => PlaytimeModule),
  ],
  providers: [SessionResolver, SessionEntityService, SessionCollectionService],
  exports: [SessionEntityService],
})
export class SessionModule {}
