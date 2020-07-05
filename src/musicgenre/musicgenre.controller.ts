import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { MusicgenreService } from './musicgenre.service';
import { MessagePattern } from '@nestjs/microservices';
import { MusicGenreDto } from '../dtos/musicgenre.dto';
import { MusicGenreEntity } from '../entities/musicgenre.entity';

@ApiTags('profession')
@Controller('musicgenre')
export class MusicgenreController {

    constructor(
        private readonly musicgenreService: MusicgenreService,
    ){}

    @MessagePattern({ cmd: 'getMusicGenre' })    
    findAllMusicGenre(data: any[]){
        return this.musicgenreService.findAllMusicGenre(data[0], data[1]);
    }

    @MessagePattern({ cmd: 'addMusicGenre' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MusicGenreEntity,
      })
    async createMusicGenre(musicgenreDto: MusicGenreDto){
        const mgenre = await this.musicgenreService.createMusicGenre(musicgenreDto);
        if(mgenre)
            return mgenre;
        throw new HttpException('Music Genre not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getMusicGenreById' })
    async findOneMusicGenre(mgenreId: string){
        Logger.log('Le genre de musique dont l"id est '+mgenreId,'MusicgenreController');
        const mgenre = await this.musicgenreService.findOneMusicGenre(mgenreId);
        if(mgenre)
            return mgenre;
        throw new HttpException('Music Genre not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updateMusicGenre' })
    async updateMusicGenre(data:any[]){
        const mgenre = await this.musicgenreService.findOneMusicGenre(data[0]);
        if(mgenre)
            return await this.musicgenreService.updateMusicGenre(data[0],data[1]);
        throw new HttpException('Music Genre not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteMusicGenre' })
    async removeMusicGenre(mgenreId: string){
        const mgenre = await this.musicgenreService.findOneMusicGenre(mgenreId);
        if(mgenre)
            return await this.musicgenreService.removeMusicGenre(mgenreId);
         throw new HttpException('Music Genre not modified',HttpStatus.NOT_FOUND);
    }
}
