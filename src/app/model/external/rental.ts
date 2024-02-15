export interface Rental {
  carId: number;
  clientId: number;
  originOfficeId: number;
  destinationOfficeId: number;
  protocolNumber: number;
  startDate: Date;
  endDate: Date;
  additions: string[];
}
