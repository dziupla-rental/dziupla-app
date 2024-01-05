export enum FuelType {
  GASOLINE = 'BENZYNA',
  DIESEL = 'DIESEL',
  LPG = 'LPG',
  ELECTRIC = 'ELEKTRYCZNY',
  HYBRID = 'HYBRYDOWY',
}

export enum VehicleType {
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
}
