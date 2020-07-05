import { Module } from '@nestjs/common';
import { ScultureController } from './sculture.controller';
import { ScultureService } from './sculture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScultureEntity } from '../entities/sculture.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ScultureEntity])],
  controllers: [ScultureController],
  providers: [ScultureService]
})
export class ScultureModule {}
