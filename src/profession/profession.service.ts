import { Injectable } from '@nestjs/common';
import { ProfessionEntity } from '../entities/profession.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionDto } from '../dtos/profession.dto';

@Injectable()
export class ProfessionService {

    @InjectRepository(ProfessionEntity)
    private readonly professionRepository: Repository<ProfessionEntity>

     findAllProfession(limit:number, offset: number){
        return this.professionRepository.find(
            {
                skip: offset,
                take: limit,
                relations:['artistes']
            });
    }

    async findOneProfession(professionId: string){
        const profession = await this.professionRepository.findOne(+professionId,{relations:['artistes']});
        if(!profession)
            return null;
        return profession;
    }

    async updateProfession(professionId: string, professionDto: ProfessionDto){
        let profession = await this.professionRepository.findOne(+professionId,{relations:['artistes']});
        if(!profession)
            return null;
        await this.professionRepository.update(professionId,professionDto);
        profession = await this.professionRepository.findOne(+professionId,{relations:['artistes']});
        return {updatedId: professionId, Artiste: profession};
    }

    async removeProfession(professionId: string){
        const profession = await this.professionRepository.findOne(+professionId,{relations:['artistes']});
        if(!profession)
            return null;
        await this.professionRepository.delete(+professionId);
        return {deletedId: professionId, nbArtiste: await this.professionRepository.findAndCount.length};
    }

    async createProfession(professionDto: ProfessionDto){        
        const profession = await this.professionRepository.save(professionDto);
        return profession;
    }
}
