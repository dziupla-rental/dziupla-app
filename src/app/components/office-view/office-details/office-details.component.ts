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
import { Office } from '../office-view.component';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-office-details',
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
  templateUrl: './office-details.component.html',
  styleUrl: './office-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeDetailsComponent implements OnChanges {
  @Input() office?: Office;
  @Input() isChecked = false;
  @Output() modOfficeEmitter = new EventEmitter<Office>();
  constructor(
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _fb: FormBuilder
  ) {}

  getFormGroup() {
    return this._fb.group({
      location: new FormControl(this.office?.location, [Validators.required]),
    });
  }
  officeForm = this.getFormGroup();
  ngOnChanges(changes: SimpleChanges): void {
    this.officeForm = this.getFormGroup();
  }

  openDeleteDialog() {}
  modOffice() {
    this.office = {
      location: this.officeForm.controls.location.value!,
      id: this.office?.id || 0,
    };
    this.modOfficeEmitter.emit(this.office);
    this.isChecked = false;
  }
}


