import { Test, TestingModule } from '@nestjs/testing';
import { ScultureController } from './sculture.controller';
import { ScultureService } from './sculture.service';
import { ScultureEntity } from '../entities/sculture.entity';
import { ScultureDto } from '../dtos/sculture.dto';

describe('Sculture Controller', () => {
  let controller: ScultureController;
  let service: ScultureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScultureController],
      providers:[ScultureService],
    }).compile();

    controller = module.get<ScultureController>(ScultureController);
    service = module.get<ScultureService>(ScultureService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find All Sculture', () => {
    it('should return an array of Scultures', async () => {
      const result = new Array(new ScultureEntity()[2]);
      const data= [];
      result[0]= {
        scultureName:'La pierre'
      };
      result[1]= {
        scultureName:'Le noyau'
      };
          jest.spyOn(service, 'findAllSculture').mockResolvedValue(result);
  
      expect(await controller.findAllSculture(data)).toEqual(result);
    });
  });
  
  describe('find One Sculture By Id', () => {
    it('should return an entity of Scultures if successful', async () => {
      const expectedResult = new ScultureEntity();
      const parameters = '2';
      jest.spyOn(service, 'findOneSculture').mockResolvedValue(expectedResult);
      expect(await controller.findOneSculture(parameters)).toBe(expectedResult);
    });
  
    it('should throw NotFoundException if Sculture not found', async (done) => {
      const expectedResult = undefined;
      const parameters = '2';
      jest.spyOn(service, 'findOneSculture').mockResolvedValue(expectedResult);
      await controller.findOneSculture(parameters)
      .then(() => done.fail('Sculture Controller should return NotFoundException error of 404 but did not'))
      .catch((error) =>{
        expect(error.status).toBe(404);
        expect(error.message).toBe('Sculture not found');
        done();
      });
    });
  });
  
    describe('create a Sculture', () => {
      const dto = new ScultureDto();
      dto.scultureName='La pierre';
      it('should return an object of Sculture entity when created', async () => {
        const expectedResult = new ScultureEntity();
        expectedResult.scultureName = 'La pierre';
        jest.spyOn(service, 'createSculture').mockResolvedValue(expectedResult);
        expect(await controller.createSculture(dto)).toBe(expectedResult);
      });
    });
  
    describe('delete a Sculture', () => {
      it('should return an object of Sculture entity when deleted', async (done) => {
        const expectedResult = {'deletedId':'2', 'nbSculture':1}; 
        const parameters = '2';
        jest.spyOn(service, 'removeSculture').mockResolvedValue(expectedResult);
        await controller.removeSculture(parameters)
        .then(() => done.fail('Sculture Controller should return NotFoundException error of 404 but did not'))
        .catch((error) =>{
          expect(error.status).toBe(404);
          expect(error.message).toBe('Sculture not modified');
          done();
        });
      });
    });
  
    describe('update a Song', () => {
      const dto = new SongDto();
      dto.songTitle='Mon album de musique';
      const parameters = '2'
      const song = new SongEntity();
      song.songId= 2;
      song.songTitle = 'Mon album de musique';
      it('should return an object of Song entity when updated', async (done) => {
        const expectedResult = {'updatedId':'2', 'Song':song};     
        jest.spyOn(service, 'updateSong').mockResolvedValue(expectedResult);
        await controller.updateSong([parameters,dto])
        .then(() => done.fail('Song Controller should return NotFoundException error of 404 but did not'))
        .catch((error) =>{
          expect(error.status).toBe(404);
          expect(error.message).toBe('Song not modified');
          done();
        });
      });
    });
});
