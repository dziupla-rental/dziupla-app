export interface Additions {
  ADDITION_DELIVERY?: string,
  ADDITION_INSURANCE?: string,
  ADDITION_DECORATION?: string,
}
export interface Rental {
  carId: number;
  clientId: number;
  originOfficeId: number;
  destinationOfficeId: number;
  protocolNumber: number;
  startDate: Date;
  endDate: Date;
  additions: Additions;
}
