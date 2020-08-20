import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playtime } from './playtime.entity';
import { PlaytimeResolver } from './playtime.resolver';
import { PlaytimeEntityService } from './playtime.entity.service';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playtime]),
    forwardRef(() => SessionModule),
  ],
  providers: [PlaytimeResolver, PlaytimeEntityService],
  exports: [PlaytimeEntityService],
})
export class PlaytimeModule {}
