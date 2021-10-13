import { Module } from '@nestjs/common';
// import { CollectionService } from './collection.service';
import {PrismaService} from "./prisma.service";

@Module({
  providers: [
    // CollectionService,
    PrismaService],
  exports: [
    // CollectionService,
    PrismaService],
})
export class CollectionModule {}
