import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BandEntity } from '../entities/band.entity';
import { Repository } from 'typeorm';
import { BandDto } from '../dtos/band.dto';

@Injectable()
export class BandService {

    @InjectRepository(BandEntity)
    private readonly bandRepository: Repository<BandEntity>

     findAllBand(limit:number, offset: number){
        return this.bandRepository.find({skip: offset,
            take: limit});
    }

    async findOneBand(bandId: string){
        const band = await this.bandRepository.findOne(+bandId);
        if(!band)
            return null;
        return band;
    }

    async updateBand(bandId: string, bandDto: BandDto){
        let band = await this.bandRepository.findOne(+bandId);
        if(!band)
            return null;
        await this.bandRepository.update(bandId,bandDto);
        band = await this.bandRepository.findOne(+bandId);
        return {updatedId: bandId, Band: band};
    }

    async removeBand(bandId: string){
        const band = await this.bandRepository.findOne(+bandId);
        if(!band)
            return null;
        await this.bandRepository.delete(+bandId);
        return {deletedId: bandId, nbBand: await this.bandRepository.findAndCount.length};
    }

    async createBand(bandDto: BandDto){        
        const Band = await this.bandRepository.save(bandDto);
        return Band;
    }
}
