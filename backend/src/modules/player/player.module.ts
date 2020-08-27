import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayerResolver } from './player.resolver';
import { PlayerEntityService } from './player.entity.service';
import { GameModule } from '../game/game.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    forwardRef(() => SessionModule),
  ],
  providers: [PlayerResolver, PlayerEntityService],
  exports: [PlayerEntityService],
})
export class PlayerModule {}
