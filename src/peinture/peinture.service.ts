import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeintureEntity } from '../entities/peinture.entity';
import { Repository } from 'typeorm';
import { PeintureDto } from '../dtos/peinture.dto';

@Injectable()
export class PeintureService {

    constructor(
        @InjectRepository(PeintureEntity)
        private readonly peintureRepository: Repository<PeintureEntity>,
    ){}
    

     findAllPeinture(limit:number, offset: number){
        return this.peintureRepository.find({skip: offset,
            take: limit});
    }

    async findOnePeinture(peintureId: string){
        const peinture = await this.peintureRepository.findOne(+peintureId);
        if(!peinture)
            return null;
        return peinture;
    }

    async updatePeinture(peintureId: string, peintureDto: PeintureDto){
        let peinture = await this.peintureRepository.findOne(+peintureId);
        if(!peinture)
            return null;
        await this.peintureRepository.update(peintureId,peintureDto);
        peinture = await this.peintureRepository.findOne(+peintureId);
        return {updatedId: peintureId, Peinture: peinture};
    }

    async removePeinture(peintureId: string){
        const peinture = await this.peintureRepository.findOne(+peintureId);
        if(!peinture)
            return null;
        await this.peintureRepository.delete(+peintureId);
        return {deletedId: peintureId, nbPeinture: await this.peintureRepository.findAndCount.length};
    }

    async createPeinture(peintureDto: PeintureDto){        
        const peinture = await this.peintureRepository.save(peintureDto);
        return peinture;
    }
}
