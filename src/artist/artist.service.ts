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
    private readonly albumRepository: Repository<AlbumEntity>
    ){}
    //limit: number, offset: number 
     findAllArtist(limit: number, offset: number){
        return this.artisteRepository.find({skip: offset,
            take: limit,relations:['professions','socials','songs','books','bands','albums']});
    }

    async findOneArtist(artisteId: string){
        const artist = await this.artisteRepository.findOne(+artisteId,{relations:['professions','socials','songs','books','bands','albums']});
        if(!artist)
            return null;
        return artist;
    }

    async updateArtist(artisteId: string, artisteDto: ArtisteDto){
        let artist = await this.artisteRepository.findOne(+artisteId,{relations:['professions','socials','songs','books','bands','albums']});
        if(!artist)
            return null;
        await this.artisteRepository.update(artisteId,artisteDto);
        artist = await this.artisteRepository.findOne(+artisteId);
        return artist;
    }

    async ProfessionArtist(artisteId: string, professionId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});        
        if(!artist)
            return null;
        const profession = await this.professionRepository.findOne(+professionId);
        if(!profession)
            return null;
        artist.professions.push(profession);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});
    }

    async SocialArtist(artisteId: string, socialId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});        
        if(!artist)
            return null;
        const social = await this.socialRepository.findOne(+socialId);
        if(!social)
            return null;
        artist.socials.push(social);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});
    }

    async SongArtist(artisteId: string, songId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});        
        if(!artist)
            return null;
        const song = await this.songRepository.findOne(+songId);
        if(!song)
            return null;
        artist.songs.push(song);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});
    }

    async BookArtist(artisteId: string, bookId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});        
        if(!artist)
            return null;
        const book = await this.bookRepository.findOne(+bookId);
        if(!book)
            return null;
        artist.books.push(book);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});
    }

    async BandArtist(artisteId: string, bandId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});        
        if(!artist)
            return null;
        const band = await this.bandRepository.findOne(+bandId);
        if(!band)
            return null;
        artist.bands.push(band);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});
    }

    async AlbumArtist(artisteId: string, albumId: string){
        const artist = await this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});        
        if(!artist)
            return null;
        const album = await this.albumRepository.findOne(+albumId);
        if(!album)
            return null;
        artist.albums.push(album);    
        await this.artisteRepository.save(artist);    
        return this.artisteRepository.findOne(+artisteId, {relations:['professions','socials','songs','books','bands','albums']});
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
