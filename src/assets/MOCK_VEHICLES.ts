import { FuelType, Vehicle, VehicleType } from '../app/model/external/vehicle';

export const VEHICLES: Vehicle[] = [
  {
    id: 1,
    name: 'Audi A4',
    type: VehicleType.CAR,
    numberOfSeats: 5,
    isAvailable: true,
    fuelType: FuelType.GASOLINE,
    deposit: 1000,
    pricePerDay: 200,
    photoUrl:
      'https://www.autocentrum.pl/ac-file/car-version-photo/1/audi-a4-b9-avant-2015-2019-2-0-tdi-190km-2016-2018-325947.jpg',
  },
  {
    id: 2,
    name: 'Audi A6',
    type: VehicleType.CAR,
    numberOfSeats: 5,
    isAvailable: true,
    fuelType: FuelType.GASOLINE,
    deposit: 1000,
    pricePerDay: 200,
    photoUrl:
      'https://www.autocentrum.pl/ac-file/car-version-photo/1/audi-a6-c8-2018-2-0-tdi-204km-2018-2019-325948.jpg',
  },
  {
    id: 3,
    name: 'Audi A8',
    type: VehicleType.CAR,
    numberOfSeats: 5,
    isAvailable: true,
    fuelType: FuelType.GASOLINE,
    deposit: 1000,
    pricePerDay: 200,
    photoUrl:
      'https://www.autocentrum.pl/ac-file/car-version-photo/1/audi-a8-d5-2017-3-0-tdi-286km-2017-2019-325949.jpg',
  },
  {
    id: 4,
    name: 'Audi Q3',
    type: VehicleType.CAR,
    numberOfSeats: 5,
    isAvailable: true,
    fuelType: FuelType.GASOLINE,
    deposit: 1000,
    pricePerDay: 200,
    photoUrl:
      'https://www.autocentrum.pl/ac-file/car-version-photo/1/audi-q3-2018-35-tfsi-150km-2018-2019-325950.jpg',
  },
  {
    id: 5,
    name: 'Audi Q5',
    type: VehicleType.CAR,
    numberOfSeats: 5,
    isAvailable: true,
    fuelType: FuelType.GASOLINE,
    deposit: 1000,
    pricePerDay: 200,
    photoUrl:
      'https://www.autocentrum.pl/ac-file/car-version-photo/1/audi-q5-2017-2-0-tdi-190km-2017-2019-325951.jpg',
  },
  {
    id: 6,
    name: 'Tesla Model S',
    type: VehicleType.CAR,
    numberOfSeats: 5,
    isAvailable: true,
    fuelType: FuelType.ELECTRIC,
    deposit: 5000,
    pricePerDay: 500,
    photoUrl:
      'https://www.autocentrum.pl/ac-file/car-version-photo/1/audi-q5-2017-2-0-tdi-190km-2017-2019-325951.jpg',
  },
  {
    id: 7,
    name: 'Trumck',
    type: VehicleType.TRUCK,
    numberOfSeats: 2,
    isAvailable: true,
    fuelType: FuelType.DIESEL,
    deposit: 2000,
    pricePerDay: 400,
    photoUrl:
      'https://www.autocentrum.pl/ac-file/car-version-photo/1/audi-q5-2017-2-0-tdi-190km-2017-2019-325951.jpg',
  },
];
