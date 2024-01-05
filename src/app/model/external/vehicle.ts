export enum FuelType {
  NULL = '',
  GASOLINE = 'BENZYNA',
  DIESEL = 'DIESEL',
  LPG = 'LPG',
  ELECTRIC = 'ELEKTRYCZNY',
  HYBRID = 'HYBRYDOWY',
}

export enum VehicleType {
  NULL = '',
  CAR = 'OSOBOWY',
  BUS = 'AUTOBUS',
  TRUCK = 'DOSTAWCZY',
}

export interface Vehicle {
  id: number;
  name: string;
  type: VehicleType;
  numberOfSeats: number;
  isAvailable: boolean;
  fuelType: FuelType;
  deposit: number;
  pricePerDay: number;
  photoUrl: string;
  office: string;
}
