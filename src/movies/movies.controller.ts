import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Patch,
  Body,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'return all movies';
  }

  @Get('/:id')
  getId(@Param('id') movieId: string) {
    return `return one movies: ${movieId}`;
  }

  @Post()
  create(@Body() MovieData) {
    console.log(MovieData);
    return 'create';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `delete one movie : ${movieId}`;
  }

  @Patch('/:id')
  update(@Param('id') movieId: string) {
    return `patch one movie : ${movieId}`;
  }
}
