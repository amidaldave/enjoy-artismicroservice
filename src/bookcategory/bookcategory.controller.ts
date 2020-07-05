import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BookcategoryService } from './bookcategory.service';
import { MessagePattern } from '@nestjs/microservices';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { BookCategoryEntity } from '../entities/bookcategory.entity';
import { BookCategoryDto } from '../dtos/bookcategory.dto';

@Controller('bookcategory')
export class BookcategoryController {

    constructor(
        private readonly bcategoryService: BookcategoryService,
    ){}

    @MessagePattern({ cmd: 'getBookCategory' })   
    findAllBookCategory(data: any[]){
        return this.bcategoryService.findAllBookCategory(data[0], data[1]);
    }

    @MessagePattern({ cmd: 'addBookCategory' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: BookCategoryEntity,
      })
    async createBookCategory(bcategoryDto: BookCategoryDto){
        const bcategory = await this.bcategoryService.createBookCategory(bcategoryDto);
        if(bcategory)
            return bcategory;
        throw new HttpException('Book Category not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'getBookCategoryById' })
    async findOneBookCategory(bcategoryId: string){
        Logger.log('La categorie dont l"id est '+bcategoryId,'BookcategoryController');
        const bcategory = await this.bcategoryService.findOneBookCategory(bcategoryId);
        if(bcategory)
            return bcategory;
        throw new HttpException('Book Category not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({ cmd: 'updateBookCategory' })
    async updateBookCategory(data:any[]){
        const bcategory = await this.bcategoryService.findOneBookCategory(data[0]);
        if(bcategory)
            return await this.bcategoryService.updateBookCategory(data[0],data[1]);
        throw new HttpException('Book Category not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'deleteBookCategory' })
    async removeBookCategory(bcategoryId: string){
        const bcategory = await this.bcategoryService.findOneBookCategory(bcategoryId);
        if(bcategory)
            return await this.bcategoryService.removeBookCategory(bcategoryId);
         throw new HttpException('Book Category not modified',HttpStatus.NOT_FOUND);
    }
}
