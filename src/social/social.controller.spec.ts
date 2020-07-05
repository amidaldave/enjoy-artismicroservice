import { Test, TestingModule } from '@nestjs/testing';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { SocialEntity } from '../entities/social.entity';
import { SocialDto } from '../dtos/social.dto';
jest.mock('./social.service');

describe('Social Controller', () => {
  let controller: SocialController;
  let service: SocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialController],
      providers: [SocialService],
    }).compile();

    controller = module.get<SocialController>(SocialController);
    service = module.get<SocialService>(SocialService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find All Social', () => {
    it('should return an array of Socials', async () => {
      const result = new Array(new SocialEntity()[2]);
      const data= [];
      result[0]= {
        socialNetwork:'Facebook',
        socialUser: 'test'
      };
      result[1]= {
        socialNetwork:'Tweet',
        socialUser: 'test'
      };
          jest.spyOn(service, 'findAllSocial').mockResolvedValue(result);
  
      expect(await controller.findAllSocial(data)).toEqual(result);
    });
  });
  
  describe('find One Social By Id', () => {
    it('should return an entity of Socials if successful', async () => {
      const expectedResult = new SocialEntity();
      const parameters = '2';
      jest.spyOn(service, 'findOneSocial').mockResolvedValue(expectedResult);
      expect(await controller.findOneSocial(parameters)).toBe(expectedResult);
    });
    it('should throw NotFoundException if social not found', async (done) => {
      const expectedResult = undefined;
      const parameters = '2';
      jest.spyOn(service, 'findOneSocial').mockResolvedValue(expectedResult);
      await controller.findOneSocial(parameters)
      .then(() => done.fail('Social Controller should return NotFoundException error of 404 but did not'))
      .catch((error) =>{
        expect(error.status).toBe(404);
        expect(error.message).toBe('Social not found');
        done();
      });
    });
  });
  
    describe('create a Social', () => {
      const dto = new SocialDto();
      dto.socialNetwork='Facebook';
      dto.socialUser='test';
      it('should return an object of Social entity when created', async () => {
        const expectedResult = new SocialEntity();
        expectedResult.socialNetwork = 'Facebook';
        expectedResult.socialUser = 'test';
        jest.spyOn(service, 'createSocial').mockResolvedValue(expectedResult);
        expect(await controller.createSocial(dto)).toBe(expectedResult);
      });
    });
  
    describe('delete a Social', () => {
      it('should return an object of Social entity when deleted', async (done) => {
        const expectedResult = {'deletedId':'2', 'nbSocials':1}; 
        const parameters = '2';
        jest.spyOn(service, 'removeSocial').mockResolvedValue(expectedResult);
        await controller.removeSocial(parameters)
        .then(() => done.fail('Social Controller should return NotFoundException error of 404 but did not'))
        .catch((error) =>{
          expect(error.status).toBe(404);
          expect(error.message).toBe('Social not modified');
          done();
        });
      });
    });
  
    describe('update a Social', () => {
      const dto = new SocialDto();
      dto.socialNetwork='Facebook';
      dto.socialUser='test';
      const parameters = '2'
      const social = new SocialEntity();
      social.socialId= 2;
      social.socialNetwork = 'Facebook';
      social.socialUser = 'test';
      it('should return an object of Social entity when updated', async (done) => {
        const expectedResult = {'updatedId':'2', 'Social':social};     
        jest.spyOn(service, 'updateSocial').mockResolvedValue(expectedResult);
        await controller.updateSocial([parameters,dto])
        .then(() => done.fail('Social Controller should return NotFoundException error of 404 but did not'))
        .catch((error) =>{
          expect(error.status).toBe(404);
          expect(error.message).toBe('Social not modified');
          done();
        });
      });
    });
});
