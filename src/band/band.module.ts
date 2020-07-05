import { Module } from '@nestjs/common';
import { BandController } from './band.controller';
import { BandService } from './band.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandEntity } from '../entities/band.entity';
import { SocialEntity } from '../entities/social.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BandEntity,SocialEntity]),
  ],
  controllers: [BandController],
  providers: [BandService]
})
export class BandModule {}
