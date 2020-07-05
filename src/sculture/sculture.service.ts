import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScultureEntity } from '../entities/sculture.entity';
import { ScultureDto} from '../dtos/sculture.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ScultureService {

    constructor(
        @InjectRepository(ScultureEntity)
        private readonly scultureRepository: Repository<ScultureEntity>,
    ){}
    

     findAllSculture(limit:number, offset: number){
        return this.scultureRepository.find({skip: offset,
            take: limit});
    }

    async findOneSculture(scultureId: string){
        const sculture = await this.scultureRepository.findOne(+scultureId);
        if(!sculture)
            return null;
        return sculture;
    }

    async updateSculture(scultureId: string, scultureDto: ScultureDto){
        let sculture = await this.scultureRepository.findOne(+scultureId);
        if(!sculture)
            return null;
        await this.scultureRepository.update(scultureId,scultureDto);
        sculture = await this.scultureRepository.findOne(+scultureId);
        return {updatedId: scultureId, Sculture: sculture};
    }

    async removeSculture(scultureId: string){
        const sculture = await this.scultureRepository.findOne(+scultureId);
        if(!sculture)
            return null;
        await this.scultureRepository.delete(+scultureId);
        return {deletedId: scultureId, nbSculture: await this.scultureRepository.findAndCount.length};
    }

    async createSculture(scultureDto: ScultureDto){        
        const sculture = await this.scultureRepository.save(scultureDto);
        return sculture;
    }
}
