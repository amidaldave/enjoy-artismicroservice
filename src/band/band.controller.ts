import { Controller, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BandService } from './band.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { BandEntity } from '../entities/band.entity';
import { BandDto } from '../dtos/band.dto';

@Controller('band')
export class BandController {

    constructor(
        private readonly bandService: BandService,
    ){}

    @MessagePattern({ cmd: 'getBand' })    
    findAllBand(data: any[]){
        return this.bandService.findAllBand(data[0], data[1]);
    }

    @MessagePattern({ cmd: 'addBand' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: BandEntity,
      })
    async createBand(bandDto: BandDto){
        const band = await this.bandService.createBand(bandDto);
        if(band)
            return band;
        throw new HttpException('Band not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getBandById' })
    async findOneBand(bandId: string){
        Logger.log('La bande dont l"id est '+ bandId,'BandController');
        const band = await this.bandService.findOneBand(bandId);
        if(band)
            return band;
        throw new HttpException('Band not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updateBand' })
    async updateBand(bandId: string, bandDto: BandDto){
        const band = await this.bandService.findOneBand(bandId);
        if(band)
            return await this.bandService.updateBand(bandId,bandDto);
        throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteBand' })
    async removeBand(bandId: string){
        const band = await this.bandService.findOneBand(bandId);
        if(band)
            return await this.bandService.removeBand(bandId);
         throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }
}
