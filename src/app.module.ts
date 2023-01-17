import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({ // 데코레이터 -> 클래스에 함수 기능을 추가할 수 있음
  // 클래스 위의 함수, 클래스를 위해 움직임
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}
