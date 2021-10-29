import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesController } from './cities/cities.controller';
import { CitiesModule } from './cities/cities.module';
import { City } from './cities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`, City],
      synchronize: true,
    }),
    CitiesModule,
  ],
  controllers: [AppController, CitiesController],
  providers: [AppService],
})
export class AppModule { }
