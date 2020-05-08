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
    BandModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
