import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCategoryEntity } from '../entities/bookcategory.entity';
import { Repository } from 'typeorm';
import { BookCategoryDto } from '../dtos/bookcategory.dto';

@Injectable()
export class BookcategoryService {

    @InjectRepository(BookCategoryEntity)
    private readonly bcategoryRepository: Repository<BookCategoryEntity>

     findAllBookCategory(limit:number, offset: number){
        return this.bcategoryRepository.find({skip: offset,
            take: limit});
    }

    async findOneBookCategory(bcategoryId: string){
        const bcategory = await this.bcategoryRepository.findOne(+bcategoryId);
        if(!bcategory)
            return null;
        return bcategory;
    }

    async updateBookCategory(bcategoryId: string, bcategoryDto: BookCategoryDto){
        let bcategory = await this.bcategoryRepository.findOne(+bcategoryId);
        if(!bcategory)
            return null;
        await this.bcategoryRepository.update(bcategoryId,bcategoryDto);
        bcategory = await this.bcategoryRepository.findOne(+bcategoryId);
        return {updatedId: bcategoryId, BookCategory: bcategory};
    }

    async removeBookCategory(bcategoryId: string){
        const bcategory = await this.bcategoryRepository.findOne(+bcategoryId);
        if(!bcategory)
            return null;
        await this.bcategoryRepository.delete(+bcategoryId);
        return {deletedId: bcategoryId, nbBookCategory: await this.bcategoryRepository.findAndCount.length};
    }

    async createBookCategory(bcategoryDto: BookCategoryDto){        
        const bcategory = await this.bcategoryRepository.save(bcategoryDto);
        return bcategory;
    }
}
