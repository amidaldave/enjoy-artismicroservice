import { Module } from '@nestjs/common';
import { EditionController } from './edition.controller';
import { EditionService } from './edition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditionEntity } from '../entities/edition.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([EditionEntity]),
  ],
  controllers: [EditionController],
  providers: [EditionService]
})
export class EditionModule {}
