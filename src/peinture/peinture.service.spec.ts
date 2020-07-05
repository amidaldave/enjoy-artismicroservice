import { Test, TestingModule } from '@nestjs/testing';
import { PeintureService } from './peinture.service';

describe('PeintureService', () => {
  let service: PeintureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeintureService],
    }).compile();

    service = module.get<PeintureService>(PeintureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
