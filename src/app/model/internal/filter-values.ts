export interface sortValue {
  sort: string;
  isAsc: boolean;
}

export interface FilterValues {
  location: string;
  startDate: Date;
  endDate: Date;
  seatAmount?: string;
  fuelType?: string;
  vehicleType?: string;
}
