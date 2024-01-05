import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { InMemoryDataService } from '../../services/in-memory-data.service';
import { FiltersComponent } from '../filters/filters.component';
import { FilterValues, sortValue } from '../../model/internal/filter-values';
import { Subject, takeUntil } from 'rxjs';
import { FuelType, Vehicle, VehicleType } from '../../model/external/vehicle';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SortBoxComponent } from './sort-box/sort-box.component';
import { FilterUtils } from '../../shared/filter-utils';
import { MatIconModule } from '@angular/material/icon';

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
export class VehicleSelectionComponent {
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
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  onFiltersChange(filters: FilterValues): void {
    //TODO: implement filtering
    this.isShowSpinner = true;
    this.isReady = true;
    this.currentFilters = filters;
    this.vehicles = [];
    this._data
      .getVehicles()
      .pipe(takeUntil(this._destroy$))
      .subscribe((vehicles) => {
        this.vehicles = vehicles;
        this.filterAndSortVehicles();
        this.isShowSpinner = false;

        this._cdRef.markForCheck();
      });
  }

  onSortChange(sort: sortValue): void {
    this.currentSort = sort;
    this.filterAndSortVehicles();
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
