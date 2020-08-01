import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import {PlayerResolver} from "./player.resolver";
import {PlayerService} from "./player.service";

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayerResolver, PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
