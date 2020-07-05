import { Injectable } from '@nestjs/common';
import { SongDto } from '../dtos/song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SongEntity } from '../entities/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongService {

    constructor(
        @InjectRepository(SongEntity)
        private readonly songRepository: Repository<SongEntity>
        ){}
        
         findAllSong(limit:number, offset: number){
            return this.songRepository.find(
                {
                    skip: offset,
                    take: limit,
                    relations:['artisteSongs','albumSong']
                });
        }
    
        async findOneSong(songId: string){
            const song = await this.songRepository.findOne(+songId,{relations:['artisteSongs','albumSong']});
            if(!song)
                return null;
            return song;
        }
    
        async updateSong(songId: string, songDto: SongDto){
            let song = await this.songRepository.findOne(+songId,{relations:['artisteSongs','albumSong']});
            if(!song)
                return null;
            await this.songRepository.update(songId,songDto);
            song = await this.songRepository.findOne(+songId,{relations:['artisteSongs','albumSong']});
            return {updatedId: songId, Song: song};
        }
    
        async removeSong(songId: string){
            const song = await this.songRepository.findOne(+songId);
            if(!song)
                return null;            
             await this.songRepository.delete(+songId);
            return {deletedId: songId, nbSongs: await this.songRepository.findAndCount.length};
        }
    
        async createSong(songDto: SongDto){        
            const song = await this.songRepository.save(songDto);
            return song;
        }
}
