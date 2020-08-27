import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanism } from './mechanism.entity';
import { MechanismResolver } from './mechanism.resolver';
import { MechanismEntityService } from './mechanism.entity.service';
import { GameModule } from '../game/game.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mechanism]),
    forwardRef(() => GameModule),
  ],
  providers: [MechanismResolver, MechanismEntityService],
  exports: [MechanismEntityService],
})
export class MechanismModule {}
