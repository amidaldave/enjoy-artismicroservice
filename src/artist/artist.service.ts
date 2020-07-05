import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtisteEntity } from '../entities/artist.entity';
import { Repository } from 'typeorm';
import { ArtisteDto } from '../dtos/artist.dto';
import { ProfessionEntity } from '../entities/profession.entity';
import { SocialEntity } from '../entities/social.entity';
import { SongEntity } from '../entities/song.entity';
import { BookEntity } from '../entities/book.entity';
import { BandEntity } from '../entities/band.entity';
import { AlbumEntity } from '../entities/album.entity';
import { MovieEntity } from '../entities/movie.entity';


@Injectable()
export class ArtistService {
    constructor(
    @InjectRepository(ArtisteEntity)
    private readonly artisteRepository: Repository<ArtisteEntity>,

    @InjectRepository(ProfessionEntity)
    private readonly professionRepository: Repository<ProfessionEntity>,

    @InjectRepository(SocialEntity)
    private readonly socialRepository: Repository<SocialEntity>,

    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(BandEntity)
    private readonly bandRepository: Repository<BandEntity>,

    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
    
    ){}
    //limit: number, offset: number 
     findAllArtist(limit: number, offset: number){
        return this.artisteRepository.find({skip: offset,
            take: limit,relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async findOneArtist(artisteId: string){
        const artist = await this.artisteRepository.findOne(+artisteId,{relations:['professions','socials','songs','books','bands','albums','movies']});
        if(!artist)
            return null;
        return artist;
    }

    async updateArtist(artisteId: string, artisteDto: ArtisteDto){
        let artist = await this.artisteRepository.findOne(+artisteId,{relations:['professions','socials','songs','books','bands','albums','movies']});
        if(!artist)
            return null;
        await this.artisteRepository.update(artisteId,artisteDto);
        artist = await this.artisteRepository.findOne(+artisteId);
        return artist;
    }

    async ProfessionArtist(artisteId: string, professionId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;
        const profession = await this.professionRepository.findOne(+professionId);
        if(!profession)
            return null;
        artist.professions.push(profession);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async DeleteProfessionArtist(artisteId: string, professionId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;        
        if(!artist.professions)
            return null;
            for(let i=0;i< artist.professions.length;i++){
                if(artist.professions[i].professionId === +professionId)
                    artist.professions.splice(i,1);
            }   
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async SocialArtist(artisteId: string, socialId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;
        const social = await this.socialRepository.findOne(+socialId);
        if(!social)
            return null;
        artist.socials.push(social);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async DeleteSocialArtist(artisteId: string, socialId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;        
        if(!artist.socials)
            return null;
            for(let i=0;i< artist.socials.length;i++){
                if(artist.socials[i].socialId === +socialId)
                    artist.socials.splice(i,1);
            }    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async SongArtist(artisteId: string, songId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;
        const song = await this.songRepository.findOne(+songId);
        if(!song)
            return null;
        artist.songs.push(song);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async DeleteSongArtist(artisteId: string, songId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;        
        if(!artist.songs)
            return null;
            for(let i=0;i< artist.songs.length;i++){
                if(artist.songs[i].songId === +songId)
                    artist.songs.splice(i,1);
            }  
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async BookArtist(artisteId: string, bookId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;
        const book = await this.bookRepository.findOne(+bookId);
        if(!book)
            return null;
        artist.books.push(book);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async DeleteBookArtist(artisteId: string, bookId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;        
        if(!artist.books)
            return null;
            for(let i=0;i< artist.books.length;i++){
                if(artist.books[i].bookId === +bookId)
                    artist.books.splice(i,1);
            }     
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async BandArtist(artisteId: string, bandId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;
        const band = await this.bandRepository.findOne(+bandId);
        if(!band)
            return null;
        artist.bands.push(band);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async DeleteBandArtist(artisteId: string, bandId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;       
        if(!artist.bands)
            return null;
            for(let i=0;i< artist.bands.length;i++){
                if(artist.bands[i].bandId === +bandId)
                    artist.bands.splice(i,1);
            }     
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async AlbumArtist(artisteId: string, albumId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;
        const album = await this.albumRepository.findOne(+albumId);
        if(!album)
            return null;
        artist.albums.push(album);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async DeleteAlbumArtist(artisteId: string, albumId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;        
        if(!artist.albums)
            return null;
            for(let i=0;i< artist.albums.length;i++){
                if(artist.albums[i].albumId === +albumId)
                    artist.albums.splice(i,1);
            }     
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async MovieArtist(artisteId: string, movieId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;
        const movie = await this.movieRepository.findOne(+movieId);
        if(!movie)
            return null;
        artist.movies.push(movie);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }

    async DeleteMovieArtist(artisteId: string, movieId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});        
        if(!artist)
            return null;        
        if(!artist.movies)
            return null;
            for(let i=0;i< artist.movies.length;i++){
                if(artist.movies[i].movieId === +movieId)
                    artist.movies.splice(i,1);
            }    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums','movies']});
    }
    
    async removeArtist(artisteId: string){
        const artist = await this.artisteRepository.findOne(+artisteId);
        if(!artist)
            return null;
        await this.artisteRepository.delete(+artisteId);
        return {deletedId: artisteId, nbArtiste: await this.artisteRepository.findAndCount.length};
    }

    async createArtiste(artisteDto: ArtisteDto){        
        const artist = await this.artisteRepository.save(artisteDto);
        return artist;
    }
}
