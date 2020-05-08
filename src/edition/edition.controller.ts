import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { EditionService } from './edition.service';
import { MessagePattern } from '@nestjs/microservices';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { EditionEntity } from '../entities/edition.entity';
import { EditionDto } from '../dtos/edition.dto';

@Controller('edition')
export class EditionController {

    constructor(
        private readonly editionService: EditionService,
    ){}

    @MessagePattern({ cmd: 'getEdition' })    
    findAllEdition(data: any[]){
        return this.editionService.findAllEdition(data[0], data[1]);
    }

    @MessagePattern({ cmd: 'addEdition' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: EditionEntity,
      })
    async createEdition(editionDto: EditionDto){
        const edition = await this.editionService.createEdition(editionDto);
        if(edition)
            return edition;
        throw new HttpException('Edition not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getEditionById' })
    async findOneEdition(editionId: string){
        Logger.log('L"edition dont l"id est '+editionId,'EditionController');
        const edition = await this.editionService.findOneEdition(editionId);
        if(edition)
            return edition;
        throw new HttpException('Edition not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updateEdition' })
    async updateEdition(editionId: string, editionDto: EditionDto){
        const edition = await this.editionService.findOneEdition(editionId);
        if(edition)
            return await this.editionService.updateEdition(editionId,editionDto);
        throw new HttpException('Edition not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteEdition' })
    async removeEdition(editionId: string){
        const edition = await this.editionService.findOneEdition(editionId);
        if(edition)
            return await this.editionService.removeEdition(editionId);
         throw new HttpException('Edition not modified',HttpStatus.NOT_FOUND);
    }
}
