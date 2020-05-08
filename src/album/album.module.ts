import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { SongEntity } from '../entities/song.entity';
import { MusicGenreEntity } from '../entities/musicgenre.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AlbumEntity,SongEntity, MusicGenreEntity]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
