import { Injectable } from '@nestjs/common';
import { MusicGenreEntity } from '../entities/musicgenre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicGenreDto } from '../dtos/musicgenre.dto';

@Injectable()
export class MusicgenreService {

    @InjectRepository(MusicGenreEntity)
    private readonly musicgenreRepository: Repository<MusicGenreEntity>

     findAllMusicGenre(limit:number, offset: number){
        return this.musicgenreRepository.find(
            {
                skip: offset,
                take: limit,
                relations:['albums']
            });
    }

    async findOneMusicGenre(mgenreId: string){
        const mgenre = await this.musicgenreRepository.findOne(+mgenreId, {relations:['albums']});
        if(!mgenre)
            return null;
        return mgenre;
    }

    async updateMusicGenre(mgenreId: string, musicgenreDto: MusicGenreDto){
        let mgenre = await this.musicgenreRepository.findOne(+mgenreId, {relations:['albums']});
        if(!mgenre)
            return null;
        await this.musicgenreRepository.update(mgenreId,musicgenreDto);
        mgenre = await this.musicgenreRepository.findOne(+mgenreId);
        return {updatedId: mgenreId, Artiste: mgenre};
    }

    async removeMusicGenre(mgenreId: string){
        const mgenre = await this.musicgenreRepository.findOne(+mgenreId, {relations:['albums']});
        if(!mgenre)
            return null;
        await this.musicgenreRepository.delete(+mgenreId);
        return {deletedId: mgenreId, nbArtiste: await this.musicgenreRepository.findAndCount.length};
    }

    async createMusicGenre(musicgenreDto: MusicGenreDto){        
        const mgenre = await this.musicgenreRepository.save(musicgenreDto);
        return mgenre;
    }
}
