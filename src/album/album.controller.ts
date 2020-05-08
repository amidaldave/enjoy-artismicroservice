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
    async updateAlbum(albumId: string, albumDto: AlbumDto){
        const album = await this.albumService.findOneAlbum(albumId);
        if(album)
            return await this.albumService.updateAlbum(albumId,albumDto);
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateAlbumSong' })
    async SongAlbum(data: any[]){
        const album = await this.albumService.SongAlbum(data[0], data[1]);        
        if(album)
            return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateAlbumGenre' })
    async GenreAlbum(data: any[]){
        const album = await this.albumService.GenreAlbum(data[0], data[1]);        
        if(album)
            return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteAlbum' })
    async removeAlbum(albumId: string){
        const album = await this.albumService.findOneAlbum(albumId);
        if(album)
            return await this.albumService.removeAlbum(albumId);
         throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }
}
