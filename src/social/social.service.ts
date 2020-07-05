import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialEntity } from '../entities/social.entity';
import { Repository } from 'typeorm';
import { SocialDto } from '../dtos/social.dto';

@Injectable()
export class SocialService {

    @InjectRepository(SocialEntity)
    private readonly socialRepository: Repository<SocialEntity>

     findAllSocial(limit:number, offset: number){
        return this.socialRepository.find(
            {
                skip: offset,
                take: limit,
                relations:['artisteSocials','bandSocials']
            });
    }

    async findOneSocial(socialId: string){
        const social = await this.socialRepository.findOne(+socialId,{relations:['artisteSocials','bandSocials']});
        if(!social)
            return null;
        return social;
    }

    async updateSocial(socialId: string, socialDto: SocialDto){
        let social = await this.socialRepository.findOne(+socialId,{relations:['artisteSocials','bandSocials']});
        if(!social)
            return null;
        await this.socialRepository.update(socialId,socialDto);
        social = await this.socialRepository.findOne(+socialId,{relations:['artisteSocials','bandSocials']});
        return {updatedId: socialId, Social: social};
    }

    async removeSocial(socialId: string){
        const social = await this.socialRepository.findOne(+socialId);
        if(!social)
            return null;
        await this.socialRepository.delete(+socialId);
        return {deletedId: socialId, nbSocials: await this.socialRepository.findAndCount.length};
    }

    async createSocial(socialDto: SocialDto){       
        const social = await this.socialRepository.save(socialDto);
        return social;
    }
}
