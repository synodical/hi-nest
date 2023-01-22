import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  // express와 달리, nestjs에서는 수동으로 import하지 않는다
  // 그 대신, constructor가 service라는 클래스를 가진다.
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search') // search가 id보다 아래에 있으면 id로 판단한다.
  search(@Query('year') searchingYear: string) {
    return `we are searching for a movie made after : ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() MovieData: CreateMovieDto) {
    return this.moviesService.create(MovieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return `delete one movie : ${movieId}`;
  }

  @Patch('/:id')
  update(@Param('id') movieId: number, @Body() updateMovieDto) {
    return this.moviesService.update(movieId, updateMovieDto);
  }
}
