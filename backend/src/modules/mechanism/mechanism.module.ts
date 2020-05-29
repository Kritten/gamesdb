import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanism } from './mechanism.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mechanism])],
})
export class MechanismModule {}
