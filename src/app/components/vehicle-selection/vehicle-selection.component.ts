import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { InMemoryDataService } from '../../services/in-memory-data.service';
import { FiltersComponent } from '../filters/filters.component';
import { FilterValues } from '../../model/internal/filter-values';
import { Subject, takeUntil } from 'rxjs';
import { Vehicle } from '../../model/external/vehicle';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-vehicle-selection',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    VehicleCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './vehicle-selection.component.html',
  styleUrl: './vehicle-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleSelectionComponent {
  private readonly _destroy$ = new Subject<void>();
  vehicles: Vehicle[] = [];

  isShowSpinner: boolean = false;

  constructor(
    private readonly _data: InMemoryDataService,
    private readonly _cdRef: ChangeDetectorRef
  ) {
    this._data
      .getVehicles()
      .pipe(takeUntil(this._destroy$))
      .subscribe((vehicles) => {
        this.vehicles = vehicles;
        this.isShowSpinner = false;
        this._cdRef.markForCheck();
      });
  }

  onFiltersChange(filters: FilterValues): void {
    //TODO: implement filtering
    this.isShowSpinner = true;
    this._data
      .getVehicles()
      .pipe(takeUntil(this._destroy$))
      .subscribe((vehicles) => {
        this.vehicles = vehicles;
        this.isShowSpinner = false;
        this._cdRef.markForCheck();
      });
  }
}
