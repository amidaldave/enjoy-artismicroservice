import { Module } from '@nestjs/common';
import { BookcategoryController } from './bookcategory.controller';
import { BookcategoryService } from './bookcategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoryEntity } from '../entities/bookcategory.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BookCategoryEntity]),
  ],
  controllers: [BookcategoryController],
  providers: [BookcategoryService]
})
export class BookcategoryModule {}
