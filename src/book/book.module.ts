import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { EditionEntity } from '../entities/edition.entity';
import { BookCategoryEntity } from '../entities/bookcategory.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BookEntity,EditionEntity,BookCategoryEntity]),
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
