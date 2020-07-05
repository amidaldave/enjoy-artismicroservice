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
    async updateBand(data:any[]){
        const band = await this.bandService.findOneBand(data[0]);
        if(band)
            return await this.bandService.updateBand(data[0],data[1]);
        throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteBand' })
    async removeBand(bandId: string){
        const band = await this.bandService.findOneBand(bandId);
        if(band)
            return await this.bandService.removeBand(bandId);
         throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateBandSocial' })
    async BandAlbum(data: any[]){
        const band = await this.bandService.SocialBand(data[0], data[1]);        
        if(band)
            return band;
        throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteBandSocial' })
    async DeleteSocialBand(data: any[]){
        const band = await this.bandService.DeleteSocialBand(data[0], data[1]);        
        if(band)
            return band;
        throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }
}
