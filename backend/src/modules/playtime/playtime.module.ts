import { forwardRef, Module } from '@nestjs/common';
import { PlaytimeResolver } from './playtime.resolver';
import { SessionModule } from '../session/session.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [
    forwardRef(() => SessionModule),
    CollectionModule,
  ],
  providers: [
    PlaytimeResolver,
  ],
  exports: [
    PlaytimeResolver
  ]
})
export class PlaytimeModule {}
