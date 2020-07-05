import { Controller, HttpException, HttpStatus, Logger, Param, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MessagePattern } from '@nestjs/microservices';
import { MovieEntity } from '../entities/movie.entity';
import { MovieDto } from '../dtos/movie.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {

    constructor(
        private readonly movieService: MovieService,
    ){}
    
    @MessagePattern({ cmd: 'getMovie' })    
    findAllMovie(data: any[]){
        return this.movieService.findAllMovie(data[0], data[1]);
    }
    
    @MessagePattern({ cmd: 'addMovie' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MovieEntity,
      })

    async createMovie(movieDto: MovieDto){
        const movie = await this.movieService.createMovie(movieDto);
        if(movie)
            return movie;
        throw new HttpException('Movie not created',HttpStatus.NOT_MODIFIED); 
    }
    
    @MessagePattern({ cmd: 'getMovieById' })
    async findOneMovie(movieId: string){
        Logger.log('Le film dont l"id est '+movieId,'MovieController');
        const movie = await this.movieService.findOneMovie(movieId);
        if(movie)
            return movie;
        throw new HttpException('Movie not found',HttpStatus.NOT_FOUND);        
    }
    
    @MessagePattern({ cmd: 'updateMovie' })
    async updateMovie(data:any[]){
        const movie = await this.movieService.findOneMovie(data[0]);
        if(movie)
            return await this.movieService.updateMovie(data[0],data[1]);
        throw new HttpException('Movie not modified',HttpStatus.NOT_FOUND);
    }
    
    @MessagePattern({ cmd: 'deleteMovie' })
    async removeMovie(movieId: string){
        const movie = await this.movieService.findOneMovie(movieId);
        if(movie)
            return await this.movieService.removeMovie(movieId);
         throw new HttpException('Movie not modified',HttpStatus.NOT_FOUND);
    }
}
