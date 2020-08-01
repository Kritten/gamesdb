import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionResolver, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
