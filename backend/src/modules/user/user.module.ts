import { forwardRef, Module } from '@nestjs/common';
import { UserEntityService } from './user.entity.service';
import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './user.resolver';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [forwardRef(() => AuthModule), CollectionModule],
  providers: [UserResolver, UserEntityService],
  exports: [UserEntityService],
})
export class UserModule {}
