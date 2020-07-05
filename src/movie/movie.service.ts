import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDto } from '../dtos/movie.dto';

@Injectable()
export class MovieService {

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>

     findAllMovie(limit:number, offset: number){
        return this.movieRepository.find(
            {
                skip: offset,
                take: limit,
                relations:['artistMovies']
            });
    }

    async findOneMovie(movieId: string){
        const movie = await this.movieRepository.findOne(+movieId,{relations:['artistMovies']});
        if(!movie)
            return null;
        return movie;
    }

    async updateMovie(movieId: string, movieDto: MovieDto){
        let movie = await this.movieRepository.findOne(+movieId,{relations:['artistMovies']});
        if(!movie)
            return null;
        await this.movieRepository.update(movieId,movieDto);
        movie = await this.movieRepository.findOne(+movieId,{relations:['artistMovies']});
        return {updatedId: movieId, Movie: movie};
    }

    async removeMovie(movieId: string){
        const movie = await this.movieRepository.findOne(+movieId);
        if(!movie)
            return null;
        await this.movieRepository.delete(+movieId);
        return {deletedId: movieId, nbMovies: await this.movieRepository.findAndCount.length};
    }

    async createMovie(movieDto: MovieDto){       
        const movie = await this.movieRepository.save(movieDto);
        return movie;
    }
}
