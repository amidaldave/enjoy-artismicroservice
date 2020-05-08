import { Module } from '@nestjs/common';
import { BandController } from './band.controller';
import { BandService } from './band.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandEntity } from '../entities/band.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BandEntity]),
  ],
  controllers: [BandController],
  providers: [BandService]
})
export class BandModule {}
