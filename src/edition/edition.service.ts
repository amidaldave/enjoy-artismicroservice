import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditionEntity } from '../entities/edition.entity';
import { Repository } from 'typeorm';
import { EditionDto } from '../dtos/edition.dto';

@Injectable()
export class EditionService {

    constructor(
        @InjectRepository(EditionEntity)
        private readonly editionRepository: Repository<EditionEntity>,
    ){}
    

     findAllEdition(limit:number, offset: number){
        return this.editionRepository.find({skip: offset,
            take: limit});
    }

    async findOneEdition(editionId: string){
        const edition = await this.editionRepository.findOne(+editionId);
        if(!edition)
            return null;
        return edition;
    }

    async updateEdition(editionId: string, editionDto: EditionDto){
        let edition = await this.editionRepository.findOne(+editionId);
        if(!edition)
            return null;
        await this.editionRepository.update(editionId,editionDto);
        edition = await this.editionRepository.findOne(+editionId);
        return {updatedId: editionId, Edition: edition};
    }

    async removeEdition(editionId: string){
        const edition = await this.editionRepository.findOne(+editionId);
        if(!edition)
            return null;
        await this.editionRepository.delete(+editionId);
        return {deletedId: editionId, nbEdition: await this.editionRepository.findAndCount.length};
    }

    async createEdition(editionDto: EditionDto){        
        const edition = await this.editionRepository.save(editionDto);
        return edition;
    }
}
