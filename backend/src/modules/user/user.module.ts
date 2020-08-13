import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
