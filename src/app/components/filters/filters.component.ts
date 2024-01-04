import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
const MATERIALS = [
  MatCardModule,
  MatFormFieldModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatMomentDateModule,
  ReactiveFormsModule,
  MatButtonModule,
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
  today: Date = new Date();
  locationSelect: FilterSelect = {
    name: 'Lokalizacja',
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
      label: 'seats',
      list: ['2', '5', '7', '10', '10+'],
    },
  ];

  readonly filtersForm = this._fb.group({
    location: new FormControl(null, [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    //Other filters
    amountOfSeats: new FormControl(''),
    fuelType: new FormControl(''),
  });

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtersForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
