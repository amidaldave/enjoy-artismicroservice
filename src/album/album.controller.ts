import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AlbumService } from './album.service';
import { MessagePattern } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumDto } from '../dtos/album.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {

    constructor(
        private readonly albumService: AlbumService,
    ){}

    @MessagePattern({ cmd: 'getAlbum' })    
    findAllAlbum(data: any[]){
        return this.albumService.findAllAlbum(data[0], data[1]);
    }

    @MessagePattern({ cmd: 'addAlbum' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: AlbumEntity,
      })
    async createAlbum(albumDto: AlbumDto){
        const album = await this.albumService.createAlbum(albumDto);
        if(album)
            return album;
        throw new HttpException('Album not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getAlbumById' })
    async findOneAlbum(albumId: string){
        Logger.log('L" dont l"id est '+ albumId,'AlbumController');
        const album = await this.albumService.findOneAlbum(albumId);
        if(album)
            return album;
        throw new HttpException('Album not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updateAlbum' })
    async updateAlbum(data:any[]){
        const album = await this.albumService.findOneAlbum(data[0]);
        if(album)
            return await this.albumService.updateAlbum(data[0],data[1]);
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateAlbumSong' })
    async SongAlbum(data: any[]){
        const album = await this.albumService.SongAlbum(data[0], data[1]);        
        if(album)
            return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteAlbumSong' })
    async DeleteSongAlbum(data: any[]){
        const artist = await this.albumService.DeleteSongAlbum(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Song not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateAlbumGenre' })
    async GenreAlbum(data: any[]){
        const album = await this.albumService.GenreAlbum(data[0], data[1]);        
        if(album)
            return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteAlbumGenre' })
    async DeleteGenreAlbum(data: any[]){
        const artist = await this.albumService.DeleteGenreAlbum(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Music Genre not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateAlbumBand' })
    async BandAlbum(data: any[]){
        const album = await this.albumService.BandAlbum(data[0], data[1]);        
        if(album)
            return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteAlbumBand' })
    async DeleteBandAlbum(data: any[]){
        const artist = await this.albumService.DeleteBandAlbum(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Band not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteAlbum' })
    async removeAlbum(albumId: string){
        const album = await this.albumService.findOneAlbum(albumId);
        if(album)
            return await this.albumService.removeAlbum(albumId);
         throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }
}
