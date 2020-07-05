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
            take: limit, relations:['artisteBooks','editionBooks','category']});
    }

    async findOneBook(bookId: string){
        const book = await this.bookRepository.findOne(+bookId,{relations:['artisteBooks','editionBooks','category']});
        if(!book)
            return null;
        return book;
    }

    async updateBook(bookId: string, bookDto: BookDto){
        let book = await this.bookRepository.findOne(+bookId,{relations:['artisteBooks','editionBooks','category']});
        if(!book)
            return null;
        await this.bookRepository.update(bookId,bookDto);
        book = await this.bookRepository.findOne(+bookId,{relations:['artisteBooks','editionBooks','category']});
        return {updatedId: bookId, Book: book};
    }

    async removeBook(bookId: string){
        const book = await this.bookRepository.findOne(+bookId,{relations:['artisteBooks','editionBooks','category']});
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
        const book = await this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks','category']});        
        if(!book)
            return null;
        const bcategory = await this.bcategoryRepository.findOne(+bcategoryId);
        if(!bcategory)
            return null;
        book.category=bcategory;    
        await this.bookRepository.save(book);    
        return this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks','category']});
    }

    async DeleteCategoryBook(bookId: string, bcategoryId: string){
        const book = await this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks','category']});       
        if(!book)
            return null;        
        if(!book.category)
            return null;
            if(book.category.bookCategoryId === +bcategoryId)
                book.category=null;
            await this.bookRepository.save(book);    
            return this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks','category']});
    }

    async EditionBook(bookId: string, editionId: string){
        const book = await this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks','category']});        
        if(!book)
            return null;
        const edition = await this.editionRepository.findOne(+editionId);
        if(!edition)
            return null;
        book.editionBooks.push(edition);    
        await this.bookRepository.save(book);    
        return this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks','category']});
    }

    async DeleteEditionBook(bookId: string, editionId: string){
        const book = await this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks','category']});       
        if(!book)
            return null;        
        if(!book.editionBooks)
            return null;
            for(let i=0;i< book.editionBooks.length;i++){
                if(book.editionBooks[i].editionId === +editionId)
                book.editionBooks.splice(i,1);
            }
            await this.bookRepository.save(book);    
            return this.bookRepository.findOne(+bookId, {relations:['artisteBooks','editionBooks','category']});
    }
}
