import { Controller,  HttpException, HttpStatus, Logger } from '@nestjs/common';
import { SongService } from './song.service';
import { ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { SongEntity } from '../entities/song.entity';
import { SongDto } from '../dtos/song.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('song')
export class SongController {

    constructor(
        private readonly songService: SongService,
    ){}

    @MessagePattern({cmd :'getSong'})    
    findAllSong(data: any[]){
        return this.songService.findAllSong(data[0], data[1]);
    }

    @MessagePattern({cmd :'addSong'})
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: SongEntity,
      })
    async createSong(songDto: SongDto){
        const song = await this.songService.createSong(songDto);
        if(song)
            return song;
        throw new HttpException('Song not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({cmd :'getSongById'})
    async findOneSong(songId: string){
        Logger.log('Le song dont l"id est '+songId,'SongController');
        const song = await this.songService.findOneSong(songId);
        if(song)
            return song;
        throw new HttpException('Song not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({cmd :'updateSong'})
    async updateSong(data:any[]){
        const song = await this.songService.findOneSong(data[0]);
        if(song)
            return await this.songService.updateSong(data[0],data[1]);
        throw new HttpException('Song not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({cmd :'deleteSong'})
    async removeSong(songId: string){
        const song = await this.songService.findOneSong(songId);
        if(song)
            return await this.songService.removeSong(songId);
         throw new HttpException('Song not modified',HttpStatus.NOT_FOUND);
    }
}
