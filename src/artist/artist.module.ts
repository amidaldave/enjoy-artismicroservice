import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtisteEntity } from '../entities/artist.entity';
import { ProfessionEntity } from '../entities/profession.entity';
import { SocialEntity } from '../entities/social.entity';
import { SongEntity } from '../entities/song.entity';
import { BookEntity } from '../entities/book.entity';
import { BandEntity } from '../entities/band.entity';
import { AlbumEntity } from '../entities/album.entity';
import { MovieEntity } from '../entities/movie.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [ArtisteEntity,
        ProfessionEntity,
        SocialEntity,
        SongEntity,
        BookEntity,
        BandEntity,
        AlbumEntity,        
        MovieEntity]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService]
})
export class ArtistModule {}
