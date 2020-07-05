import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PeintureService } from './peinture.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { PeintureEntity } from '../entities/peinture.entity';
import { PeintureDto } from '../dtos/peinture.dto';

@Controller('peinture')
export class PeintureController {
    constructor(
        private readonly peintureService: PeintureService,
    ){}

    @MessagePattern({ cmd: 'getPeinture' })    
    findAllPeinture(data: any[]){
        return this.peintureService.findAllPeinture(data[0], data[1]);
    }

    @MessagePattern({ cmd: 'addPeinture' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: PeintureEntity,
      })
    async createPeinture(peintureDto: PeintureDto){
        const peinture = await this.peintureService.createPeinture(peintureDto);
        if(peinture)
            return peinture;
        throw new HttpException('Peinture not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getPeintureById' })
    async findOnePeinture(peintureId: string){
        Logger.log('La peinture dont l"id est '+peintureId,'PeintureController');
        const peinture = await this.peintureService.findOnePeinture(peintureId);
        if(peinture)
            return peinture;
        throw new HttpException('Peinture not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updatePeinture' })
    async updatePeinture(data:any[]){
        const peinture = await this.peintureService.findOnePeinture(data[0]);
        if(peinture)
            return await this.peintureService.updatePeinture(data[0],data[1]);
        throw new HttpException('Peinture not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deletePeinture' })
    async removePeinture(peintureId: string){
        const peinture = await this.peintureService.findOnePeinture(peintureId);
        if(peinture)
            return await this.peintureService.removePeinture(peintureId);
         throw new HttpException('Peinture not modified',HttpStatus.NOT_FOUND);
    }
}
