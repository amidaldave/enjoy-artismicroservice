import { Module } from '@nestjs/common';
import { MusicgenreController } from './musicgenre.controller';
import { MusicgenreService } from './musicgenre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicGenreEntity } from '../entities/musicgenre.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([MusicGenreEntity]),
  ],
  controllers: [MusicgenreController],
  providers: [MusicgenreService]
})
export class MusicgenreModule {}
