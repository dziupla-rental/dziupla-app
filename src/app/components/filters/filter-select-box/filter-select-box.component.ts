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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MATERIALS = [
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatIconModule,
  MatButtonModule,
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
  @Input() matIcon?: string;
  @Input() isRequired: boolean = false;

  selectValue: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSelectionChange(event: MatSelectChange): void {
    this.parsedControl!.setValue(event.value);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.parsedControl!.setValue(event.value);
  }

  onClear(): void {
    this.selectValue = '';
    this.parsedControl!.setValue('');
  }
}
