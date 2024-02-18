import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../model/external/vehicle';
import { environment } from '../../environments/environment';
import { Office } from '../model/external/office';

const VEHICLE_URL = environment.apiUrl + '/car';
const OFFICE_URL = environment.apiUrl + '/office';

@Injectable({
  providedIn: 'any',
})
export class VehicleSelectionService {
  constructor(private readonly _http: HttpClient) {}

  getAvailableVehicles(
    officeId: number,
    startDate: string,
    endDate: string
  ): Observable<Vehicle[]> {
    return this._http.get<Vehicle[]>(
      `${VEHICLE_URL}/carByDate?params=${officeId}&params=${startDate}&params=${endDate}`
    );
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this._http.get<Vehicle[]>(VEHICLE_URL);
  }

  getOffices(): Observable<Office[]> {
    return this._http.get<Office[]>(OFFICE_URL);
  }
}
