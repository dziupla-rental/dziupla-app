import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  SelectedDates,
  VehicleFormService,
} from '../../services/vehicle-form.service';
import { Vehicle } from '../../model/external/vehicle';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { VehicleCardComponent } from '../vehicle-selection/vehicle-card/vehicle-card.component';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { ExtraOption } from '../../model/internal/extra-option';
import { MatButtonModule } from '@angular/material/button';
import { Rental } from '../../model/external/rental';
import { StorageService } from '../../services/storage.service';
import { RentalService } from '../../services/rental.service';
import { VehicleSelectionService } from '../../services/vehicle-selection.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const MATERIALS = [
  MatCardModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatInputModule,
  MatMomentDateModule,
  MatCheckboxModule,
  MatButtonModule,
];

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, MATERIALS, VehicleCardComponent],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormComponent implements OnInit, OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private readonly _sendRental$ = new Subject<Rental>();

  selectedVehicle?: Vehicle;
  selectedDates: SelectedDates = { startDate: new Date(), endDate: new Date() };

  form = this._fb.group({
    renterName: new FormControl('', [Validators.required]),
    renterSurname: new FormControl('', [Validators.required]),
    isCompany: new FormControl(false),
    startDate: new FormControl({
      value: this.selectedDates.startDate,
      disabled: true,
    }),
    endDate: new FormControl({
      value: this.selectedDates.endDate,
      disabled: true,
    }),
    driversLicense: new FormControl('', [Validators.required]),
    expiryDate: new FormControl('', [Validators.required]),
  });

  readonly extraOptions: ExtraOption[] = [
    {
      name: 'Dekoracja pojazdu z okazji',
      formLabel: 'ADDITION_DECORATION',
      price: 100,
      isExtraInfoRequired: true,
      extraInfo: '',
      isSelected: false,
    },
    {
      name: 'Dodatkowe ubezpieczenie',
      formLabel: 'ADDITION_INSURANCE',
      price: 600,
      isExtraInfoRequired: false,
      extraInfo: '',
      isSelected: false,
    },
    {
      name: 'Dowiezienie do klienta',
      formLabel: 'ADDITION_DELIVERY',
      price: 50,
      isExtraInfoRequired: false,
      extraInfo: '',
      isSelected: false,
    },
  ];

  selectedCategories: string[] = [];

  isAgreed: boolean = false;

  isExtraNotFilled: boolean = false;
  totalPrice: number = 0;
  lastDate: Date = new Date();

  constructor(
    private readonly _vehicleFormService: VehicleFormService,
    private readonly _vehicleSelectionService: VehicleSelectionService,
    private readonly _rentalService: RentalService,
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _storage: StorageService,
    private readonly _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selectedVehicle = this._vehicleFormService.selectedVehicle;
    this.selectedDates = this._vehicleFormService.selectedDates;

    if (!this.selectedVehicle) {
      this._router.navigate(['vehicle-selection']);
    }

    this.form.controls.startDate.setValue(this.selectedDates.startDate);
    this.form.controls.endDate.setValue(this.selectedDates.endDate);

    const timeDifference =
      this.selectedDates.endDate.getTime() -
      this.selectedDates.startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    this.totalPrice =
      this.selectedVehicle!.deposit +
      daysDifference * this.selectedVehicle!.cost;

    this.lastDate = new Date(
      this.selectedDates.endDate.getTime() + 24 * 60 * 60 * 1000
    ); // Add a day to the endDate

    this.listenForRental();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onExtraOptionChange(extraOption: ExtraOption): void {
    extraOption.isSelected = !extraOption.isSelected;
    if (extraOption.isSelected) {
      this.totalPrice += extraOption.price;
    } else {
      this.totalPrice -= extraOption.price;
    }
    this.isExtraNotFilled = !this.checkIfExtraFilled();
  }

  onExtraOptionInput(event: Event, extraOption: ExtraOption): void {
    extraOption.extraInfo = (event.target as HTMLInputElement).value;
    this.isExtraNotFilled = !this.checkIfExtraFilled();
  }

  checkIfExtraFilled(): boolean {
    return this.extraOptions
      .filter((opt) => opt.isSelected && opt.isExtraInfoRequired)
      .every((extraOption) => extraOption.extraInfo !== '');
  }

  //TODO: implement category to vehicle validation
  onCategoryChange(event: MatCheckboxChange, category: string): void {
    if (event.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (cat) => cat !== category
      );
    }
  }

  onSubmit(): void {
    this._vehicleSelectionService
      .getOffices()
      .pipe(takeUntil(this._destroy$))
      .subscribe((offices) => {
        const office = offices.find(
          (off) => off.location === this._vehicleFormService.office
        )!;
        const rental: Rental = {
          carId: this.selectedVehicle!.id,
          clientId: this._storage.getUser()?.id ?? 1,
          originOfficeId: office.id,
          destinationOfficeId: office.id,
          protocolNumber: 0,
          startDate: this.selectedDates.startDate,
          endDate: this.selectedDates.endDate,
          additions: this.extraOptions
            .filter((option) => option.isSelected)
            .map((option) => {
              return { value: option.formLabel, info: option.extraInfo };
            }),
        };

        this._sendRental$.next(rental);
      });
  }

  listenForRental(): void {
    this._sendRental$
      .pipe(
        switchMap((rental) => this._rentalService.addRental(rental)),
        takeUntil(this._destroy$)
      )
      .subscribe((result) => {
        if (result) {
          this._matSnackBar.open('Wypożyczenie zakończone pomyślnie', 'OK');
          this._router.navigate(['']).then(() => {});
        } else {
          this._matSnackBar.open('Wystąpił błąd podczas wypożyczenia', 'OK');
        }
      });
  }
}
