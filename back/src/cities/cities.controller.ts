import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
// import { City } from './city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) { }

  @Get()
  index(@Query('q') q: string): Promise<any> {
    return this.citiesService.index(q);
  }
}
