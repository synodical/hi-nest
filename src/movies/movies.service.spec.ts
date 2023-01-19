import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', function () {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  // getOne()시 movie가 create되어있는지
  describe('getOne', () => {
    it('should return a movie', function () {
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', function () {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteOne', () => {
    it('deletes a movie', function () {
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return 404', function () {
      try {
        service.deleteOne(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create a movie', function () {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
  describe('update', () => {
    it('should update a movie', function () {
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2000,
      });
      service.update(1, { title: 'updated test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated test');
    });
    it('should throw a NotFoundException', function () {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
