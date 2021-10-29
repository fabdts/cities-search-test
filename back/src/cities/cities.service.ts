import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>
  ) { }

  /**
   * Return cities
   * @param q Query param
   * @returns Filtered cities City[]
   */
  async index(q: string): Promise<City[]> {
    if (!q || q.length < 2) throw new BadRequestException();

    return await this.cityRepository
      .createQueryBuilder()
      .orderBy('city.name')
      .limit(100)
      // Input starts with city name OR starts with zip code
      .where('city.name LIKE :name', { name: `${q}%` })
      .orWhere('city.zip LIKE :zip', { zip: `${q}%` })
      .getMany();
  }
}
