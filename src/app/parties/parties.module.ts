import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartiesController } from './parties.controller';
import { PartyRepository } from './parties.repository';
import { PartiesService } from './parties.service';

@Module({
  imports: [TypeOrmModule.forFeature([PartyRepository])],
  controllers: [PartiesController],
  providers: [PartiesService],
})
export class PartiesModule {}
