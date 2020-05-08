import { Test, TestingModule } from '@nestjs/testing';
import { MusicgenreService } from './musicgenre.service';

describe('MusicgenreService', () => {
  let service: MusicgenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicgenreService],
    }).compile();

    service = module.get<MusicgenreService>(MusicgenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
