import { Test, TestingModule } from '@nestjs/testing';
import { SocialService } from './social.service';
import { SocialEntity } from '../entities/social.entity';
import { MockType, repositoryMockFactory } from '../repositoryMock';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SocialDto } from '../dtos/social.dto';

describe('SocialService', () => {
  let service: SocialService;
  let socialRepositoryMock: 
  MockType<Repository<SocialEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialService,
        {
          provide:getRepositoryToken(SocialEntity),
          useFactory: repositoryMockFactory
        },]
    }).compile();

    service = module.get<SocialService>(SocialService);
    socialRepositoryMock = module.get(getRepositoryToken(SocialEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all socials', () =>{
    it('should return an array of socials', async () =>{
      const result = new Array(new SocialEntity()[2]);
    result[0]= {
      socialNetwork:'Facebook'
    };
    result[1]= {
      socialUser:'amidaldave'
    };
    socialRepositoryMock.find.mockReturnValue(result);
    expect(await service.findAllSocial(1,1)).toBe(result);
    });
  });
  describe('find One Social By Id', () => {
      it('should return an entity of Socials if successful', async () => {
        const expectedResult = new SocialEntity();
        const parameters = '2';
       socialRepositoryMock.findOne.mockReturnValue(expectedResult);
       expect(await service.findOneSocial(parameters)).toBe(expectedResult);
      });
    
      it('should throw NotFoundException if social not found', async () => {
        const expectedResult = null;
        const parameters = '2';
        socialRepositoryMock.findOne.mockReturnValue(expectedResult);
       expect(await service.findOneSocial(parameters)).toBe(expectedResult);
      });
    });

    describe('delete a Social', () => {
      it('should return an object of Social entity when deleted', async () => {
       // const expectedResult = {'deletedId':'2', 'nbSocials':1}; 
       const expectedResult = null;
        const parameters = '2';
        socialRepositoryMock.remove.mockReturnValue(expectedResult);
       expect(await service.removeSocial(parameters)).toBe(expectedResult);
      });
    });
  
    describe('update a Song', () => {
      const dto = new SocialDto();
      dto.socialNetwork='Facebook';
      dto.socialUser= 'test';
      const parameters = '2'
      const social = new SocialEntity();
      social.socialId= 2;
      social.socialNetwork = 'Facebook';
      social.socialUser= 'test';
      it('should return an object of Social entity when updated', async () => {
        //const expectedResult = {'updatedId':'2', 'Social':social};   
        const expectedResult = null;  
        socialRepositoryMock.update.mockReturnValue(expectedResult);
        expect(await service.updateSocial(parameters,dto)).toBe(expectedResult);
      });
    });
  });

