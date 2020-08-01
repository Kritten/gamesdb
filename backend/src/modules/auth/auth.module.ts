import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  providers: [AuthService, AuthStrategy, SessionSerializer],
  controllers: [AuthController],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
