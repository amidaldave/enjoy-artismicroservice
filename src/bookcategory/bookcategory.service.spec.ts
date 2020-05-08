import { Test, TestingModule } from '@nestjs/testing';
import { BookcategoryService } from './bookcategory.service';

describe('BookcategoryService', () => {
  let service: BookcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookcategoryService],
    }).compile();

    service = module.get<BookcategoryService>(BookcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
