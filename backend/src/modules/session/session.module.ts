import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';
import { GameModule } from '../game/game.module';
import { PlayerModule } from '../player/player.module';
import { PlaytimeModule } from '../playtime/playtime.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    forwardRef(() => GameModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => PlaytimeModule),
  ],
  providers: [SessionResolver, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
