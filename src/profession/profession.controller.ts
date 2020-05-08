import { Controller, HttpException, HttpStatus, Param, Logger } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionDto } from '../dtos/profession.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProfessionEntity } from '../entities/profession.entity';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('profession')
@Controller('profession')
export class ProfessionController {

    constructor(
        private readonly professionService: ProfessionService,
    ){}

    @MessagePattern({ cmd: 'getProfession' })  
    findAllProfession(data: any[]){
        return this.professionService.findAllProfession(data[0], data[1]);
    }

    @MessagePattern({ cmd: 'addProfession' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ProfessionEntity,
      })
    async createProfession(professionDto: ProfessionDto){
        const profession = await this.professionService.createProfession(professionDto);
        if(profession)
            return profession;
        throw new HttpException('Profession not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getProfessionById' })
    async findOneProfession(professionId: string){
        Logger.log('La profession dont l"id est '+professionId,'ProfessionController');
        const profession = await this.professionService.findOneProfession(professionId);
        if(profession)
            return profession;
        throw new HttpException('Profession not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updateProfession' })
    async updateProfession(professionId: string, professionDto: ProfessionDto){
        const profession = await this.professionService.findOneProfession(professionId);
        if(profession)
            return await this.professionService.updateProfession(professionId,professionDto);
        throw new HttpException('Profession not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteProfession' })
    async removeProfession(@Param('professionId') professionId: string){
        const profession = await this.professionService.findOneProfession(professionId);
        if(profession)
            return await this.professionService.removeProfession(professionId);
         throw new HttpException('Profession not modified',HttpStatus.NOT_FOUND);
    }
}
