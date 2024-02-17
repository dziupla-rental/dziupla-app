import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { InMemoryDataService } from '../../services/in-memory-data.service';
import { FiltersComponent } from '../filters/filters.component';
import { FilterValues, sortValue } from '../../model/internal/filter-values';
import { Subject, takeUntil } from 'rxjs';
import {
  FUEL_TYPE_NAMES,
  FuelType,
  Vehicle,
  VehicleType,
} from '../../model/external/vehicle';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SortBoxComponent } from './sort-box/sort-box.component';
import { FilterUtils } from '../../shared/filter-utils';
import { MatIconModule } from '@angular/material/icon';
import { VehicleFormService } from '../../services/vehicle-form.service';
import { Router } from '@angular/router';
import { VehicleSelectionService } from '../../services/vehicle-selection.service';

const MATERIALS = [MatIconModule];

@Component({
  selector: 'app-vehicle-selection',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    VehicleCardComponent,
    SpinnerComponent,
    SortBoxComponent,
    MATERIALS,
  ],
  templateUrl: './vehicle-selection.component.html',
  styleUrl: './vehicle-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleSelectionComponent implements OnInit {
  private readonly _destroy$ = new Subject<void>();
  vehicles: Vehicle[] = [];

  isShowSpinner: boolean = false;

  isReady: boolean = false;

  currentSort: sortValue = { sort: '', isAsc: true };
  currentFilters: FilterValues = {
    location: '',
    startDate: new Date(),
    endDate: new Date(),
    seatAmount: '',
    fuelType: FuelType.NULL,
    vehicleType: VehicleType.NULL,
  };

  constructor(
    private readonly _data: InMemoryDataService,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _vehicleFormService: VehicleFormService,
    private readonly _vehicleSelectionService: VehicleSelectionService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {}

  onFiltersChange(filters: FilterValues): void {
    //TODO: implement filtering
    this.isShowSpinner = true;
    this.isReady = true;
    this.currentFilters = filters;
    this.vehicles = [];
    this._vehicleSelectionService
      .getAllVehicles()
      .pipe(takeUntil(this._destroy$))
      .subscribe((vehicles) => {
        //This is so stupid but oh well
        //(Map the fuel type to the polish name of the fuel type)
        this.vehicles = vehicles.map((vehicle) => {
          return {
            ...vehicle,
            fuelType: FUEL_TYPE_NAMES.find(
              (fuel) => fuel.value === vehicle.fuelType
            )!.name,
          };
        });

        this.filterAndSortVehicles();
        this.isShowSpinner = false;

        this._cdRef.markForCheck();
      });
  }

  onSortChange(sort: sortValue): void {
    this.currentSort = sort;
    this.filterAndSortVehicles();
  }

  onVehicleSelected(vehicle: Vehicle): void {
    this._vehicleFormService.selectedVehicle = vehicle;

    this._vehicleFormService.selectedDates = {
      startDate: this.currentFilters.startDate,
      endDate: this.currentFilters.endDate,
    };

    this._vehicleFormService.office = this.currentFilters.location;

    this._router.navigate(['form']).then(() => {});
  }

  private filterAndSortVehicles(): void {
    this.vehicles = FilterUtils.filterOptions(
      this.vehicles,
      this.currentFilters,
      this.currentSort
    );
    this._cdRef.markForCheck();
  }
}
