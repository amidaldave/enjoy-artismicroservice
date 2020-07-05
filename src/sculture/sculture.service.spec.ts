import { Test, TestingModule } from '@nestjs/testing';
import { ScultureService } from './sculture.service';
import { MockType, repositoryMockFactory } from '../repositoryMock';
import { Repository } from 'typeorm';
import { ScultureEntity } from '../entities/sculture.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScultureDto } from '../dtos/sculture.dto';

describe('ScultureService', () => {
  let service: ScultureService;
  let scultureRepositoryMock: MockType<Repository<ScultureEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScultureService,
      {
        provide:getRepositoryToken(ScultureEntity),
        useFactory:repositoryMockFactory
      }],
    }).compile();

    service = module.get<ScultureService>(ScultureService);
    scultureRepositoryMock = module.get(getRepositoryToken(ScultureEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all scultures', () =>{
    it('should return an array of scultures', async () =>{
      const result = new Array(new ScultureEntity()[2]);
    result[0]= {
      scultureName:'La noyau'
    };
    result[1]= {
      scultureName:'La pierre'
    };
    scultureRepositoryMock.find.mockReturnValue(result);
    expect(await service.findAllSculture(1,1)).toBe(result);
    });
  });
  describe('find One Sculture By Id', () => {
      it('should return an entity of Scultures if successful', async () => {
        const expectedResult = new ScultureEntity();
        const parameters = '2';
       scultureRepositoryMock.findOne.mockReturnValue(expectedResult);
       expect(await service.findOneSculture(parameters)).toBe(expectedResult);
      });
    
      it('should throw NotFoundException if sculture not found', async () => {
        const expectedResult = null;
        const parameters = '2';
        scultureRepositoryMock.findOne.mockReturnValue(expectedResult);
       expect(await service.findOneSculture(parameters)).toBe(expectedResult);
      });
    });

    describe('delete a Sculture', () => {
      it('should return an object of Sculture entity when deleted', async () => {
        const expectedResult = {'deletedId':'2', 'nbScultures':1}; 
        const parameters = '2';
        scultureRepositoryMock.remove.mockReturnValue(expectedResult);
       expect(await service.removeSculture(parameters)).toBe(expectedResult);
      });
    });
  
    describe('update a Sculture', () => {
      const dto = new ScultureDto();
      dto.scultureName='La pierre';
      const parameters = '2'
      const sculture = new ScultureEntity();
      sculture.scultureId= 2;
      sculture.scultureName='La pierre';
      it('should return an object of Sculture entity when updated', async () => {
        const expectedResult = {'updatedId':'2', 'Sculture':sculture};     
        scultureRepositoryMock.update.mockReturnValue(expectedResult);
        expect(await service.updateSculture(parameters,dto)).toBe(expectedResult);
      });
    });

});
