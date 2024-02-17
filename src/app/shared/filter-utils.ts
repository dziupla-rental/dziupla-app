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

          case filters.location !== vehicle.office.location:
          case filters.seatAmount &&
            ((filters.seatAmount === '10+' && vehicle.seatNumber < 10) ||
              (filters.seatAmount !== '10+' &&
                filters.seatAmount !== String(vehicle.seatNumber))):
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
            return (a.seatNumber - b.seatNumber) * sortFactor;
          case 'cena':
            return (a.cost - b.cost) * sortFactor;
          case 'dostępność':
            return (
              (a.available === b.available ? 0 : a.available ? -1 : 1) *
              sortFactor
            );
          default:
            return 0;
        }
      });
  }
}
