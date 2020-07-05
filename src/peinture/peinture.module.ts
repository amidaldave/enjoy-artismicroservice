import { Module } from '@nestjs/common';
import { PeintureController } from './peinture.controller';
import { PeintureService } from './peinture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeintureEntity } from '../entities/peinture.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PeintureEntity])],
  controllers: [PeintureController],
  providers: [PeintureService]
})
export class PeintureModule {}
