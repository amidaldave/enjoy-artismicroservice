import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './artist/artist.module';
import { ProfessionModule } from './profession/profession.module';
import { SocialModule } from './social/social.module';
import { SongModule } from './song/song.module';
import { MusicgenreModule } from './musicgenre/musicgenre.module';
import { AlbumModule } from './album/album.module';
import { EditionModule } from './edition/edition.module';
import { BookcategoryModule } from './bookcategory/bookcategory.module';
import { BookModule } from './book/book.module';
import { BandModule } from './band/band.module';
import { MovieModule } from './movie/movie.module';
import { PeintureModule } from './peinture/peinture.module';
import { ScultureModule } from './sculture/sculture.module';

@Module({
  imports: [ArtistModule,
    TypeOrmModule.forRoot(),
    ProfessionModule,
    SocialModule,
    SongModule,
    MusicgenreModule,
    AlbumModule,
    EditionModule,
    BookcategoryModule,
    BookModule,
    BandModule,
    MovieModule,
    PeintureModule,
    ScultureModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
