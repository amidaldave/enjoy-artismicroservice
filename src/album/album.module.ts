import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { SongEntity } from '../entities/song.entity';
import { MusicGenreEntity } from '../entities/musicgenre.entity';
import { BandEntity } from '../entities/band.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AlbumEntity,SongEntity, MusicGenreEntity,BandEntity]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
