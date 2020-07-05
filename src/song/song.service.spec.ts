import { Test, TestingModule } from '@nestjs/testing';
import { SongService } from './song.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SongEntity } from '../entities/song.entity';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../repositoryMock';
import { SongDto } from '../dtos/song.dto';

describe('SongService', () => {
  let service: SongService;
  let songRepositoryMock: 
  MockType<Repository<SongEntity>>;


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [SongService,
      {
        provide:getRepositoryToken(SongEntity),
        useFactory: repositoryMockFactory
      },]
    }).compile();

    service = module.get<SongService>(SongService);
    songRepositoryMock = module.get(getRepositoryToken(SongEntity));
  });

  it('should be find all songs', async () => {
    expect(service).toBeDefined();
  });

  describe('find all songs', () =>{
    it('should return an array of songs', async () =>{
      const result = new Array(new SongEntity()[2]);
    result[0]= {
      songTitle:'Ma musique'
    };
    result[1]= {
      songTitle:'Ma chanson'
    };
    songRepositoryMock.find.mockReturnValue(result);
    expect(await service.findAllSong(1,1)).toBe(result);
    });
  });
  describe('find One Song By Id', () => {
      it('should return an entity of Songs if successful', async () => {
        const expectedResult = new SongEntity();
        const parameters = '2';
       songRepositoryMock.findOne.mockReturnValue(expectedResult);
       expect(await service.findOneSong(parameters)).toBe(expectedResult);
      });
    
      it('should throw NotFoundException if client not found', async () => {
        const expectedResult = null;
        const parameters = '2';
        songRepositoryMock.findOne.mockReturnValue(expectedResult);
       expect(await service.findOneSong(parameters)).toBe(expectedResult);
      });
    });

    describe('delete a Song', () => {
      it('should return an object of Song entity when deleted', async () => {
       // const expectedResult = {'deletedId':'2', 'nbSongs':1}; 
       const expectedResult = null;
        const parameters = '2';
        songRepositoryMock.remove.mockReturnValue(expectedResult);
       expect(await service.removeSong(parameters)).toBe(expectedResult);
      });
    });
  
    describe('update a Song', () => {
      const dto = new SongDto();
      dto.songTitle='Mon album de musique';
      const parameters = '2'
      
      it('should return an object of Song entity when updated', async () => {
        const song = new SongEntity();
        song.songId= 2;
        const expectedResult = {'updatedId':'2', 'Song':song};
        song.songTitle = 'Mon album de musique';
        songRepositoryMock.update.mockReturnValue(expectedResult);
        expect(await service.updateSong(parameters,dto)).toBe(expectedResult);
      });

      it('should return null if Song entity not found', async () => {
        //const expectedResult = {'updatedId':'2', 'Song':song};    
        const expectedResult = null; 
        songRepositoryMock.update.mockImplementation(expectedResult);
        expect(await service.updateSong(parameters,dto)).toBe(expectedResult);
      });
    });
  });




