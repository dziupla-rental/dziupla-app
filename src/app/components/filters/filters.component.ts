import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterSelectBoxComponent } from './filter-select-box/filter-select-box.component';
import { FilterSelect } from '../../model/internal/filter-select';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { FilterValues } from '../../model/internal/filter-values';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuelType, VehicleType } from '../../model/external/vehicle';
const MATERIALS = [
  MatCardModule,
  MatFormFieldModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatMomentDateModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatTooltipModule,
];

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FilterSelectBoxComponent, MATERIALS],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Output() filtersChange: EventEmitter<FilterValues> = new EventEmitter();

  today: Date = new Date();
  locationSelect: FilterSelect = {
    name: 'Lokalizacja*',
    label: 'location',
    list: [
      'Warsaw',
      'Cracow',
      'Wroclaw',
      'Gdansk',
      'Poznan',
      'Szczecin',
      'Lodz',
      'Lublin',
      'Katowice',
      'Bialystok',
    ],
  };

  readonly basicFilters: FilterSelect[] = [
    {
      name: 'Ilość miejsc',
      label: 'numberOfSeats',
      list: ['2', '5', '7', '10', '10+'],
    },
    {
      name: 'Rodzaj paliwa',
      label: 'fuelType',
      list: [
        FuelType.DIESEL,
        FuelType.ELECTRIC,
        FuelType.GASOLINE,
        FuelType.HYBRID,
        FuelType.LPG,
      ],
    },
    {
      name: 'Typ nadwozia',
      label: 'vehicleType',
      list: [VehicleType.CAR, VehicleType.TRUCK, VehicleType.BUS],
    },
  ];

  readonly filtersForm = this._fb.group({
    location: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    //Other filters
    numberOfSeats: new FormControl(''),
    fuelType: new FormControl(''),
    vehicleType: new FormControl(''),
  });

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {}

  onApplyFilters(): void {
    this.filtersChange.emit({
      location: this.filtersForm.controls.location.value!,
      startDate: new Date(this.filtersForm.controls.startDate.value as string),
      endDate: new Date(this.filtersForm.controls.endDate.value as string),
      seatAmount: this.filtersForm.controls.numberOfSeats.value || '',
      fuelType: this.filtersForm.controls.fuelType.value || '',
      vehicleType: this.filtersForm.controls.vehicleType.value || '',
    });
  }
}
