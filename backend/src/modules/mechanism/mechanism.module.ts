import { forwardRef, Module } from '@nestjs/common';
import { MechanismResolver } from './mechanism.resolver';
import { GameModule } from '../game/game.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [
    forwardRef(() => GameModule),
    CollectionModule,
  ],
  providers: [MechanismResolver],
})
export class MechanismModule {}
