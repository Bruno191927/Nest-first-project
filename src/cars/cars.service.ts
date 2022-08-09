import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from '../cars/dto/index';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    //
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find((c) => c.id == id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  create(createCarDto: CreateCarDto) {
    /*
      const newCar: Car = {
      id: uuid(),
      ...createCarDto
    };
    */
    const newCar: Car = {
      id: uuid(),
      brand: createCarDto.brand,
      model: createCarDto.model,
    };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    if (updateCarDto.id && updateCarDto.id != id) {
      throw new BadRequestException(`Car id is not valid`);
    }
    let carDb = this.findById(id);
    this.cars = this.cars.map((c) => {
      if (carDb.id == id) {
        carDb = {
          ...carDb,
          ...updateCarDto,
          id,
        };
        return carDb;
      }
      return c;
    });
    return carDb;
  }

  delete(id: string) {
    this.findById(id);
    this.cars = this.cars.filter((c) => c.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
