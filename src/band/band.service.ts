import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BandEntity } from '../entities/band.entity';
import { Repository } from 'typeorm';
import { BandDto } from '../dtos/band.dto';
import { SocialEntity } from '../entities/social.entity';

@Injectable()
export class BandService {

    constructor(
        @InjectRepository(BandEntity)
        private readonly bandRepository: Repository<BandEntity>,

        @InjectRepository(SocialEntity)
        private readonly socialRepository: Repository<SocialEntity>
    ){}
    
     findAllBand(limit:number, offset: number){
        return this.bandRepository.find({skip: offset,
            take: limit,relations:['albumBands','socialBands','artisteBands']});
    }

    async findOneBand(bandId: string){
        const band = await this.bandRepository.findOne(+bandId, {relations:['albumBands','socialBands','artisteBands']});
        if(!band)
            return null;
        return band;
    }

    async updateBand(bandId: string, bandDto: BandDto){
        let band = await this.bandRepository.findOne(+bandId, {relations:['albumBands','socialBands','artisteBands']});
        if(!band)
            return null;
        await this.bandRepository.update(bandId,bandDto);
        band = await this.bandRepository.findOne(+bandId, {relations:['albumBands','socialBands','artisteBands']});
        return {updatedId: bandId, Band: band};
    }

    async removeBand(bandId: string){
        const band = await this.bandRepository.findOne(+bandId, {relations:['albumBands','socialBands','artisteBands']});
        if(!band)
            return null;
        await this.bandRepository.delete(+bandId);
        return {deletedId: bandId, nbBand: await this.bandRepository.findAndCount.length};
    }

    async createBand(bandDto: BandDto){        
        const Band = await this.bandRepository.save(bandDto);
        return Band;
    }

    async SocialBand(bandId: string, socialId: string){
        const band = await this.bandRepository.findOne(+bandId, {relations:['albumBands','socialBands','artisteBands']});        
        if(!band)
            return null;
        const social = await this.socialRepository.findOne(+socialId);
        if(!social)
            return null;
        band.socialBands.push(social);    
        await this.bandRepository.save(band);    
        return this.bandRepository.findOne(+bandId, {relations:['albumBands','socialBands','artisteBands']});
    }

    async DeleteSocialBand(bandId: string, socialId: string){
        const band = await this.bandRepository.findOne(+bandId, {relations:['albumBands','socialBands','artisteBands']});        
        if(!band)
            return null;        
        if(!band.socialBands)
            return null;
            for(let i=0;i< band.socialBands.length;i++){
                if(band.socialBands[i].socialId === +socialId)
                band.socialBands.splice(i,1);
            }    
            await this.bandRepository.save(band);    
            return this.bandRepository.findOne(+bandId, {relations:['albumBands','socialBands','artisteBands']});
    }
}
