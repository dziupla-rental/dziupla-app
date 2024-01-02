import { Injectable } from '@angular/core';
import { Vehicle } from '../model/external/vehicle';
import { VEHICLES } from '../../assets/MOCK_VEHICLES';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  private readonly _mockVehicles: Vehicle[] = VEHICLES;

  constructor() {}

  getVehicles(ids?: number[]): Observable<Vehicle[]> {
    const filteredVehicles = ids
      ? this._mockVehicles.filter((vehicle) => ids.includes(vehicle.id))
      : this._mockVehicles;
    return of(filteredVehicles).pipe(delay(500));
  }

  // Overrides the genId method to ensure that a vehicle always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number.
  // if the array is not empty, the method below returns the highest
  // hero id + 1.
  private genId(vehicles: Vehicle[]): number {
    return vehicles.length > 0
      ? Math.max(...vehicles.map((vehicle) => vehicle.id)) + 1
      : 1;
  }
}
