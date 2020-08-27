import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playtime } from './playtime.entity';
import { PlaytimeResolver } from './playtime.resolver';
import { PlaytimeEntityService } from './playtime.entity.service';
import { SessionModule } from '../session/session.module';
import { PlaytimeCollectionService } from './collection/playtime.collection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playtime]),
    forwardRef(() => SessionModule),
  ],
  providers: [
    PlaytimeResolver,
    PlaytimeEntityService,
    PlaytimeCollectionService,
  ],
  exports: [PlaytimeEntityService],
})
export class PlaytimeModule {}
