import { Controller, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookService } from './book.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { BookEntity } from '../entities/book.entity';
import { BookDto } from '../dtos/book.dto';

@Controller('book')
export class BookController {

    constructor(
        private readonly bookService: BookService,
    ){}

    @MessagePattern({ cmd: 'getBook' })    
    findAllBook(data: any[]){
        return this.bookService.findAllBook(data[0],data[1]);
    }

    @MessagePattern({ cmd: 'addBook' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: BookEntity,
      })
    async createBook(bookDto: BookDto){
        const book = await this.bookService.createBook(bookDto);
        if(book)
            return book;
        throw new HttpException('Book not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getBookById' })
    async findOneBook(bookId: string){
        Logger.log('Le livre dont l"id est '+ bookId,'BookController');
        const book = await this.bookService.findOneBook(bookId);
        if(book)
            return book;
        throw new HttpException('Book not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updateBook' })
    async updateBook(bookId: string, bookDto: BookDto){
        const book = await this.bookService.findOneBook(bookId);
        if(book)
            return await this.bookService.updateBook(bookId,bookDto);
        throw new HttpException('Book Category not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteBook' })
    async removeBook(bookId: string){
        const book = await this.bookService.findOneBook(bookId);
        if(book)
            return await this.bookService.removeBook(bookId);
         throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateBookEdition' })
    async EditionBook(data: any[]){
        const book = await this.bookService.EditionBook(data[0], data[1]);        
        if(book)
            return book
        throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateCategoryBook' })
    async CategoryBook(data: any[]){
        const book = await this.bookService.CategoryBook(data[0], data[1]);        
        if(book)
            return book
        throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }
}
