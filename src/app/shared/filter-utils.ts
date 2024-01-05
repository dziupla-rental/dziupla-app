import { ReplaySubject } from 'rxjs';
import { Vehicle } from '../model/external/vehicle';
import { FilterValues, sortValue } from '../model/internal/filter-values';

export namespace FilterUtils {
  export function filterOptions(
    list: Vehicle[],
    filters: FilterValues,
    sort: sortValue
  ): Vehicle[] {
    const sortFactor = sort.isAsc ? 1 : -1;
    return list
      .filter((vehicle) => {
        switch (true) {
          //Don't know how the dates are gonna be handled yet
          /*
      case filters.startDate &&
        filters.startDate.getTime() > vehicle.endDate.getTime():
      case filters.endDate &&
        filters.endDate.getTime() < vehicle.startDate.getTime():
      */

          case filters.location !== vehicle.office:
          case filters.seatAmount &&
            ((filters.seatAmount === '10+' && vehicle.numberOfSeats < 10) ||
              (filters.seatAmount !== '10+' &&
                filters.seatAmount !== String(vehicle.numberOfSeats))):
          case filters.fuelType && filters.fuelType !== vehicle.fuelType:
          case filters.vehicleType && filters.vehicleType !== vehicle.type:
            return false;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        switch (sort.sort) {
          case 'typ':
            return a.type.localeCompare(b.type) * sortFactor;
          case 'ilość miejsc':
            return (a.numberOfSeats - b.numberOfSeats) * sortFactor;
          case 'cena':
            return (a.pricePerDay - b.pricePerDay) * sortFactor;
          case 'dostępność':
            return (
              (a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1) *
              sortFactor
            );
          default:
            return 0;
        }
      });
  }
}
