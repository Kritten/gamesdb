import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanism } from './mechanism.entity';
import { MechanismResolver } from './mechanism.resolver';
import { MechanismService } from './mechanism.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mechanism])],
  providers: [MechanismResolver, MechanismService],
  exports: [MechanismService],
})
export class MechanismModule {}
