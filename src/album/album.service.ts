import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { Repository } from 'typeorm';
import { AlbumDto } from '../dtos/album.dto';
import { SongEntity } from '../entities/song.entity';
import { MusicGenreEntity } from '../entities/musicgenre.entity';

@Injectable()
export class AlbumService {

    constructor(

    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,

    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,

    @InjectRepository(MusicGenreEntity)
    private readonly mgenreRepository: Repository<MusicGenreEntity>
    ){

    }
    

     findAllAlbum(limit: number, offset: number){
        return this.albumRepository.find({skip: offset,
            take: limit,relations:['songsAlbum']});
    }

    async findOneAlbum(albumId: string){
        const album = await this.albumRepository.findOne(+albumId, {relations:['songsAlbum']});
        if(!album)
            return null;
        return album;
    }

    async updateAlbum(albumId: string, albumDto: AlbumDto){
        let album = await this.albumRepository.findOne(+albumId, {relations:['songsAlbum']});
        if(!album)
            return null;
        await this.albumRepository.update(albumId,albumDto);
        album = await this.albumRepository.findOne(+albumId, {relations:['songsAlbum']});
        return {updatedId: albumId, Album: album};
    }

    async SongAlbum(albumId: string, songId: string){
        const album = await this.albumRepository.findOne(+albumId, {relations:['songsAlbum']});        
        if(!album)
            return null;
        const song = await this.songRepository.findOne(+songId);
        if(!song)
            return null;
        album.songsAlbum.push(song);    
        await this.albumRepository.save(album);    
        return this.albumRepository.findOne(+albumId, {relations:['songsAlbum']});
    }

    async GenreAlbum(albumId: string, mgenreId: string){
        const album = await this.albumRepository.findOne(+albumId, {relations:['songsAlbum']});        
        if(!album)
            return null;
        const mgenre = await this.mgenreRepository.findOne(+mgenreId);
        if(!mgenre)
            return null;
        album.musicgenre=mgenre;    
        await this.albumRepository.save(album);    
        return this.albumRepository.findOne(+albumId, {relations:['songsAlbum']});
    }

    async removeAlbum(albumId: string){
        const album = await this.albumRepository.findOne(+albumId);
        if(!album)
            return null;
        await this.albumRepository.delete(+albumId);
        return {deletedId: albumId, nbAlbum: await this.albumRepository.findAndCount.length};
    }

    async createAlbum(albumDto: AlbumDto){        
        const album = await this.albumRepository.save(albumDto);
        return album;
    }
}
