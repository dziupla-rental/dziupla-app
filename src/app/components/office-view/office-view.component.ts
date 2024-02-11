import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  EntryListComponent,
  ListingRecord,
} from '../entry-list/entry-list.component';
import { RegisterViewComponent } from '../register-view/register-view.component';
import { OfficeService } from '../../services/office.service';
import { OfficeDetailsComponent } from './office-details/office-details.component';
import { Subject, takeUntil } from 'rxjs';

export interface Office {
  id: number;
  location: string;
}

@Component({
  selector: 'app-office-view',
  standalone: true,
  imports: [
    MatCardModule,
    FlexLayoutModule,
    RegisterViewComponent,
    EntryListComponent,
    MatIconModule,
    MatButtonModule,
    OfficeDetailsComponent,
  ],
  templateUrl: './office-view.component.html',
  styleUrl: './office-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeViewComponent {
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private officeService: OfficeService,
    private readonly _cdRef: ChangeDetectorRef
  ) {}
  officeEntries?: ListingRecord[];
  officeResponse?: Office;
  askForEdit: boolean = false;

  fetchOffices() {
    this.askForEdit = false;
    this.officeService
      .getOffices()
      .pipe(takeUntil(this._destroy$))
      .subscribe((officeList) => {
        if (officeList) {
          this.officeEntries = officeList.map((o) => ({
            id: o.id,
            name: o.location,
          }));
        }
        console.log('Offices:', officeList);
        this._cdRef.markForCheck();
      });
  }

  ngOnInit(): void {
    this.fetchOffices();
  }

  selectEntry(id: number): void {
    this.officeService
      .getOffice(id)
      .pipe(takeUntil(this._destroy$))
      .subscribe((off) => {
        if (off) {
          this.officeResponse = off;
        }
        console.log('Office:', off);
        this._cdRef.markForCheck();
      });
  }
  createOffice(): void {
    this.officeService
      .postOffice({ location: 'Nowe Miasto', id: 0 })
      .pipe(takeUntil(this._destroy$))
      .subscribe((off) => {
        if (off) {
          this.officeResponse = off;
        }

        this.fetchOffices();
        this.askForEdit = true;
      });
  }
  modifyOffice(office: Office): void {
    this.officeService
      .putOffice(office)
      .pipe(takeUntil(this._destroy$))
      .subscribe((off) => {
        if (off) {
          this.officeResponse = off;
        }
        this.fetchOffices();
      });
  }
  deleteOffice(office: Office): void {
    this.officeService
      .deleteOffice(office.id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.fetchOffices();
      });
  }
}
