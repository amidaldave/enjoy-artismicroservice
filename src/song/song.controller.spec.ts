import { Test, TestingModule } from '@nestjs/testing';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { SongEntity } from '../entities/song.entity';
import { SongDto } from '../dtos/song.dto';
jest.mock('./song.service');

describe('Song Controller', () => {
  let controller: SongController;
  let service: SongService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [SongController],
      providers:[SongService],
    }).compile();

    controller = module.get<SongController>(SongController);
    service = module.get<SongService>(SongService);
  });

 /*  afterEach(() => {
    jest.resetAllMocks();
  });
 */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find All Song', () => {
  it('should return an array of Songs', async () => {
    const result = new Array(new SongEntity()[2]);
    const data= [];
    result[0]= {
      songTitle:'Ma musique'
    };
    result[1]= {
      songTitle:'Ma chanson'
    };
        jest.spyOn(service, 'findAllSong').mockResolvedValue(result);

    expect(await controller.findAllSong(data)).toEqual(result);
  });
});

describe('find One Song By Id', () => {
  it('should return an entity of Songs if successful', async () => {
    const expectedResult = new SongEntity();
    const parameters = '2';
    jest.spyOn(service, 'findOneSong').mockResolvedValue(expectedResult);
    expect(await controller.findOneSong(parameters)).toBe(expectedResult);
  });

  it('should throw NotFoundException if client not found', async (done) => {
    const expectedResult = undefined;
    const parameters = '2';
    jest.spyOn(service, 'findOneSong').mockResolvedValue(expectedResult);
    await controller.findOneSong(parameters)
    .then(() => done.fail('Song Controller should return NotFoundException error of 404 but did not'))
    .catch((error) =>{
      expect(error.status).toBe(404);
      expect(error.message).toBe('Song not found');
      done();
    });
  });
});

  describe('create a Song', () => {
    const dto = new SongDto();
    dto.songTitle='Mon album de musique';
    it('should return an object of Song entity when created', async () => {
      const expectedResult = new SongEntity();
      expectedResult.songTitle = 'Mon album de musique';
      jest.spyOn(service, 'createSong').mockResolvedValue(expectedResult);
      expect(await controller.createSong(dto)).toBe(expectedResult);
    });
  });

  describe('delete a Song', () => {
    it('should return an object of Song entity when deleted', async (done) => {
      const expectedResult = {'deletedId':'2', 'nbSongs':1}; 
      const parameters = '2';
      jest.spyOn(service, 'removeSong').mockResolvedValue(expectedResult);
      await controller.removeSong(parameters)
      .then(() => done.fail('Song Controller should return NotFoundException error of 404 but did not'))
      .catch((error) =>{
        expect(error.status).toBe(404);
        expect(error.message).toBe('Song not modified');
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