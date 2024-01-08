import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ThemePalette } from '@angular/material/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
  @Output() personEmitter = new EventEmitter<PersonData>();
  @Input() personData?: PersonData;

  @Input() officeList?: string[];
  @Input() positionList?: string[];
  edit: boolean = true;
  isChecked = true;

  constructor(private readonly _fb: FormBuilder) {}
  getFormGroup() {
    return this._fb.group({
      first_name: new FormControl(this.personData?.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(this.personData?.last_name, [
        Validators.required,
      ]),
      position: new FormControl(this.personData?.position, [
        Validators.required,
      ]),
      office: new FormControl(this.personData?.office, [Validators.required]),
      salary: new FormControl(this.personData?.salary, [Validators.required]),
      shift_end: new FormControl(this.personData?.shift_end, [
        Validators.required,
      ]),
      shift_start: new FormControl(this.personData?.shift_start, [
        Validators.required,
      ]),
    });
  }
  employeeForm = this.getFormGroup();
  ngOnChanges(changes: SimpleChanges): void {
    this.employeeForm = this.getFormGroup();
  }
  delEmployee(): void {}
  modEmployee(): void {
    this.personData = {
      first_name: this.employeeForm.controls.first_name.value!,
      last_name: this.employeeForm.controls.last_name.value!,
      position: this.employeeForm.controls.position.value!,
      id: this.personData?.id || 0,
      salary: Number(this.employeeForm.controls.salary.value!),
      shift_start: this.employeeForm.controls.shift_start.value!,
      shift_end: this.employeeForm.controls.shift_end.value!,
      office: this.employeeForm.controls.office.value!,
    };
    this.personEmitter.emit(this.personData);
    this.isChecked = false;
  }
}
