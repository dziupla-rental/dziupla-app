import { Injectable } from '@angular/core';
import { Vehicle } from '../model/external/vehicle';

export interface SelectedDates {
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class VehicleFormService {
  private _selectedVehicle?: Vehicle;

  public get selectedVehicle(): Vehicle | undefined {
    return this._selectedVehicle;
  }

  public set selectedVehicle(vehicle: Vehicle | undefined) {
    this._selectedVehicle = vehicle;
  }

  private _selectedDates: SelectedDates = {
    startDate: new Date(),
    endDate: new Date(),
  };

  public get selectedDates(): SelectedDates {
    return this._selectedDates;
  }

  public set selectedDates(dates: SelectedDates) {
    this._selectedDates = dates;
  }

  constructor() {}
}
