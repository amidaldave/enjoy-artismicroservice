import { Controller, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtisteDto } from '../dtos/artist.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ArtisteEntity } from '../entities/artist.entity';
import { MessagePattern } from '@nestjs/microservices';


@ApiTags('artist')
@Controller('artist')
export class ArtistController {
    logger = new Logger('Service-Artist');
    constructor(
        private readonly artisteService: ArtistService,    
    ){}
    
    @MessagePattern({ cmd: 'getArtist' })    
    findAllArtist(data: any[]){
        return this.artisteService.findAllArtist(data[0],data[1]);
    }
    
    @MessagePattern({ cmd: 'addArtist' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ArtisteEntity,
      })
    async createArtiste(artisteDto: ArtisteDto){
        const artiste = await this.artisteService.createArtiste(artisteDto);
        if(artiste)
            return artiste;
        throw new HttpException('Artiste not created',HttpStatus.NOT_MODIFIED); 
        this.logger.log('L"artiste dont l"id est '+artiste.artisteId+' a ete cree','ArtisteController');
    }

    @MessagePattern({ cmd: 'getArtistById' })
    async findOneArtiste(artisteId: string){
        this.logger.log('L"artiste dont l"id est '+artisteId,'ArtisteController');
        const artiste = await this.artisteService.findOneArtist(artisteId);
        if(artiste)
            return artiste;
        throw new HttpException('Artiste not found',HttpStatus.NOT_FOUND);        
    }
    
    @MessagePattern({ cmd: 'updateArtist' })
    async updateArtist(data:any []){        
        const artist = await this.artisteService.findOneArtist(data[0]);  
        this.logger.log('L"artiste dont l"id est '+data[0]+' '+data[1],'ArtisteController');      
        if(artist)
            return await this.artisteService.updateArtist(data[0],data[1]);
        this.logger.log('L"artiste update dont l"id est '+data[0],'ArtisteController');        
    }

    @MessagePattern({ cmd: 'updateArtistProfession' })
    async ProfessionArtist(data: any[]){
        const artist = await this.artisteService.ProfessionArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteArtistProfession' })
    async DeleteProfessionArtist(data: any[]){
        const artist = await this.artisteService.DeleteProfessionArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Profession not modified',HttpStatus.NOT_FOUND);
    }

    
    @MessagePattern({ cmd: 'updateArtistSocial' })
    async SocialArtist(data: any[]){
        const artist = await this.artisteService.SocialArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteArtistSocial' })
    async DeleteSocialArtist(data: any[]){
        const artist = await this.artisteService.DeleteSocialArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Social not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateArtistSong' })
    async SongArtist(data: any[]){
        const artist = await this.artisteService.SongArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteArtistSong' })
    async DeleteSongArtist(data: any[]){
        const artist = await this.artisteService.DeleteSongArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Song not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateArtistBook' })
    async BookArtist(data: any[]){
        const artist = await this.artisteService.BookArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteArtistBook' })
    async DeleteBookArtist(data: any[]){
        const artist = await this.artisteService.DeleteBookArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Book not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateArtistBand' })
    async BandArtist(data: any[]){
        const artist = await this.artisteService.BandArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteArtistBand' })
    async DeleteBandArtist(data: any[]){
        const artist = await this.artisteService.DeleteBandArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Band not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateArtistAlbum' })
    async AlbumArtist(data: any[]){
        const artist = await this.artisteService.AlbumArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteArtistAlbum' })
    async DeleteAlbumArtist(data: any[]){
        const artist = await this.artisteService.DeleteAlbumArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Album not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateArtistMovie' })
    async MovieArtist(data: any[]){
        const artist = await this.artisteService.MovieArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artiste Movie not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteArtistMovie' })
    async DeleteMovieArtist(data: any[]){
        const artist = await this.artisteService.DeleteMovieArtist(data[0], data[1]);        
        if(artist)
            return artist;
        throw new HttpException('Artist Movie not modified',HttpStatus.NOT_FOUND);
    }
    
    @MessagePattern({ cmd: 'deleteArtist' })
    async removeArtist(artisteId: string){
        const artist = await this.artisteService.findOneArtist(artisteId);
        if(artist)
            return await this.artisteService.removeArtist(artisteId);
         throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    
}
