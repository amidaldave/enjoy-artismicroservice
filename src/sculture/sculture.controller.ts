import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ScultureService } from './sculture.service';
import { MessagePattern } from '@nestjs/microservices';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ScultureDto } from '../dtos/sculture.dto';
import { ScultureEntity } from '../entities/sculture.entity';

@Controller('sculture')
export class ScultureController {

    constructor(
        private readonly scultureService: ScultureService,
    ){}

    @MessagePattern({ cmd: 'getSculture' })    
    findAllSculture(data: any[]){
        return this.scultureService.findAllSculture(data[0], data[1]);
    }

    @MessagePattern({ cmd: 'addSculture' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ScultureEntity,
      })
    async createSculture(scultureDto: ScultureDto){
        const sculture = await this.scultureService.createSculture(scultureDto);
        if(sculture)
            return sculture;
        throw new HttpException('Sculture not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getScultureById' })
    async findOneSculture(scultureId: string){
        Logger.log('La sculture dont l"id est '+scultureId,'ScultureController');
        const sculture = await this.scultureService.findOneSculture(scultureId);
        if(sculture)
            return sculture;
        throw new HttpException('Sculture not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updateSculture' })
    async updateSculture(data:any[]){
        const sculture = await this.scultureService.findOneSculture(data[0]);
        if(sculture)
            return await this.scultureService.updateSculture(data[0],data[1]);
        throw new HttpException('Sculture not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteSculture' })
    async removeSculture(scultureId: string){
        const sculture = await this.scultureService.findOneSculture(scultureId);
        if(sculture)
            return await this.scultureService.removeSculture(scultureId);
         throw new HttpException('Sculture not modified',HttpStatus.NOT_FOUND);
    }
}
