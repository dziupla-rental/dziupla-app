import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ThemePalette } from '@angular/material/core';

import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';

export interface PersonData {
  first_name: string;
  last_name: string;
  position: string;
  id: number;
  salary: number;
  shift_start: string;
  shift_end: string;
  office: string;
}

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    _MatSlideToggleRequiredValidatorModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnChanges {
  @Input() personData?: PersonData;
  @Input() officeList?: string[];
  @Input() positionList?: string[];
  edit: boolean = true;
  isChecked = true;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.personData);
  }
}
