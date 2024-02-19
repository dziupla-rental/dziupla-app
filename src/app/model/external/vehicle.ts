import { Office } from './office';

export enum FuelTypeName {
  NULL = '',
  GASOLINE = 'BENZYNA',
  DIESEL = 'DIESEL',
  LPG = 'LPG',
  ELECTRIC = 'ELEKTRYCZNY',
  HYBRID = 'HYBRYDOWY',
}

export enum FuelType {
  NULL = '',
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  LPG = 'LPG',
  ELECTRIC = 'ELECTRICAL',
  HYBRID = 'HYBRID',
}

export const FUEL_TYPE_NAMES: { value: FuelType; name: FuelTypeName }[] = [
  { value: FuelType.NULL, name: FuelTypeName.NULL },
  { value: FuelType.PETROL, name: FuelTypeName.GASOLINE },
  { value: FuelType.DIESEL, name: FuelTypeName.DIESEL },
  { value: FuelType.LPG, name: FuelTypeName.LPG },
  { value: FuelType.ELECTRIC, name: FuelTypeName.ELECTRIC },
  { value: FuelType.HYBRID, name: FuelTypeName.HYBRID },
];

export enum VehicleType {
  COMBI = 'COMBI',
  COUPE = 'COUPE',
  HATCHBACK = 'HATCHBACK',
  LIFTBACK = 'LIFTBACK',
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  NULL = '',
  //Unused???
  CAR = 'OSOBOWY',
  BUS = 'AUTOBUS',
  TRUCK = 'DOSTAWCZY',
}

export interface Photo {
  url: string;
  id: number;
}

export interface Vehicle {
  id: number;
  cost: number;
  deposit: number;
  insuranceNumber: number;
  available: boolean;
  model: string;
  office: Office;
  officeId: number;
  seatNumber: number;
  technicalStatus: boolean;
  fuelType: FuelType | FuelTypeName;
  photo: Photo;
  type: VehicleType;
  licence: string;
}
