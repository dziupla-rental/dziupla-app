import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FilterSelect } from '../../../model/internal/filter-select';
import { AbstractControl } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIALS = [
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatMomentDateModule,
];

@Component({
  selector: 'app-filter-select-box',
  standalone: true,
  imports: [CommonModule, MATERIALS],
  templateUrl: './filter-select-box.component.html',
  styleUrl: './filter-select-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSelectBoxComponent implements OnInit {
  @Input() selectData: FilterSelect = {
    name: '',
    label: '',
    list: [],
  };

  @Input() parsedControl?: AbstractControl;

  selectValue: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.selectData);
  }

  onSelectionChange(event: MatSelectChange) {
    this.parsedControl!.setValue(event.value);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.parsedControl!.setValue(event.value);
  }
}
