import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanism } from './mechanism.entity';
import { MechanismResolver } from './mechanism.resolver';
import { MechanismService } from './mechanism.service';
import { GameModule } from '../game/game.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mechanism]),
    forwardRef(() => GameModule),
  ],
  providers: [MechanismResolver, MechanismService],
  exports: [MechanismService],
})
export class MechanismModule {}
