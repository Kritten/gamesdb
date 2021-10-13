import { forwardRef, Module } from '@nestjs/common';
import { PlayerResolver } from './player.resolver';
import { SessionModule } from '../session/session.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [
    forwardRef(() => SessionModule),
    CollectionModule,
  ],
  providers: [PlayerResolver],
})
export class PlayerModule {}
