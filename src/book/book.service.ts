import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { BookDto } from '../dtos/book.dto';
import { BookCategoryEntity } from '../entities/bookcategory.entity';
import { EditionEntity } from '../entities/edition.entity';


@Injectable()
export class BookService {

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>

    @InjectRepository(BookCategoryEntity)
    private readonly bcategoryRepository: Repository<BookCategoryEntity>

    @InjectRepository(EditionEntity)
    private readonly editionRepository: Repository<EditionEntity>

     findAllBook(limit:number, offset: number){
        return this.bookRepository.find({skip: offset,
            take: limit, relations:['artisteBooks','editionBooks']});
    }

    async findOneBook(bookId: string){
        const book = await this.bookRepository.findOne(+bookId,{relations:['artisteBooks','editionBooks']});
        if(!book)
            return null;
        return book;
    }

    async updateBook(bookId: string, bookDto: BookDto){
        let book = await this.bookRepository.findOne(+bookId,{relations:['artisteBooks','editionBooks']});
        if(!book)
            return null;
        await this.bookRepository.update(bookId,bookDto);
        book = await this.bookRepository.findOne(+bookId);
        return {updatedId: bookId, Book: book};
    }

    async removeBook(bookId: string){
        const book = await this.bookRepository.findOne(+bookId);
        if(!book)
            return null;
        await this.bookRepository.delete(+bookId);
        return {deletedId: bookId, nbArtiste: await this.bookRepository.findAndCount.length};
    }

    async createBook(bookDto: BookDto){        
        const book = await this.bookRepository.save(bookDto);
        return book;
    }

    async CategoryBook(bookId: string, bcategoryId: string){
        const book = await this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks']});        
        if(!book)
            return null;
        const bcategory = await this.bcategoryRepository.findOne(+bcategoryId);
        if(!bcategory)
            return null;
        book.category=bcategory;    
        await this.bookRepository.save(book);    
        return this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks']});
    }

    async EditionBook(bookId: string, editionId: string){
        const book = await this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks']});        
        if(!book)
            return null;
        const edition = await this.editionRepository.findOne(+editionId);
        if(!edition)
            return null;
        book.editionBooks.push(edition);    
        await this.bookRepository.save(book);    
        return this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks']});
    }
}
