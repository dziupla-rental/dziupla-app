import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

export interface Employee {
  name: string;
  lastName: string;
  role: string;
  id: number;
  salary: number;
  shiftStart: string;
  shiftEnd: string;
  office: string;
  email: string;
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
  @Output() modPersonEmitter = new EventEmitter<Employee>();
  @Output() delPersonEmitter = new EventEmitter<Employee>();
  @Input() personData?: Employee;

  @Input() officeList?: string[];
  @Input() positionList?: string[];
  edit: boolean = true;
  @Input() isChecked = false;

  constructor(private readonly _fb: FormBuilder, private readonly _cdRef: ChangeDetectorRef) {}
  getFormGroup() {
    return this._fb.group({
      lastName: new FormControl(this.personData?.lastName, [
        Validators.required,
      ]),
      name: new FormControl(this.personData?.name, [
        Validators.required,
      ]),
      position: new FormControl(this.personData?.role, [
        Validators.required,
      ]),
      office: new FormControl(this.personData?.office, [Validators.required]),
      salary: new FormControl(this.personData?.salary, [Validators.required]),
      shiftEnd: new FormControl(this.personData?.shiftEnd, [
        Validators.required,
      ]),
      shiftStart: new FormControl(this.personData?.shiftStart, [
        Validators.required,
      ]),
      email: new FormControl(this.personData?.email, [
        Validators.required,
      ]),
    });
  }
  employeeForm = this.getFormGroup();
  ngOnChanges(changes: SimpleChanges): void {
    this.employeeForm = this.getFormGroup();
    
  }

  delEmployee(): void {
    this.delPersonEmitter.emit(this.personData);
    this.personData = undefined;
  }
  modEmployee(): void {
    this.personData = {
      name: this.employeeForm.controls.name.value!,
      lastName: this.employeeForm.controls.lastName.value!,
      role: this.employeeForm.controls.position.value!,
      id: this.personData?.id || 0,
      salary: Number(this.employeeForm.controls.salary.value!),
      shiftStart: this.employeeForm.controls.shiftStart.value!,
      shiftEnd: this.employeeForm.controls.shiftEnd.value!,
      office: this.employeeForm.controls.office.value!,
      email: this.employeeForm.controls.email.value!,
    };
    this.modPersonEmitter.emit(this.personData);
    this.isChecked = false;
  }
}
