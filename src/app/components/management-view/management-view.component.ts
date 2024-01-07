import { ChangeDetectionStrategy,   ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { EmployeeDetailsComponent, PersonData } from './employee-details/employee-details.component';

export interface ListingRecord {
  name: string;
  id: number;
}
export interface ManagementData {
  employees: ListingRecord[];
  offices: string[];
  positions: string[];
}

@Component({
  selector: 'app-management-view',
  standalone: true,
  imports: [
    MatCardModule,
    FlexLayoutModule,
    EntryListComponent,
    EmployeeDetailsComponent,
  ],
  templateUrl: './management-view.component.html',
  styleUrl: './management-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementViewComponent {
  personResponse? : PersonData;
  
  responseData?: ManagementData = {
    employees: [
      { name: 'John Deere', id: 1 },
      { name: 'Jan Paweł 2', id: 2 },
      { name: 'Zbigniew Wodecki', id: 3 },
      { name: 'Adam Małysz', id: 4 },
      { name: 'John Deere', id: 1 },
      { name: 'Jan Paweł 2', id: 2 },
      { name: 'Zbigniew Wodecki', id: 3 },
      { name: 'Adam Małysz', id: 4 },
      { name: 'John Deere', id: 1 },
      { name: 'Jan Paweł 2', id: 2 },
      { name: 'Zbigniew Wodecki', id: 3 },
      { name: 'Adam Małysz', id: 4 },
      { name: 'John Deere', id: 1 },
      { name: 'Jan Paweł 2', id: 2 },
      { name: 'Zbigniew Wodecki', id: 3 },
      { name: 'Adam Małysz', id: 4 },
      { name: 'John Deere', id: 1 },
      { name: 'Jan Paweł 2', id: 2 },
      { name: 'Zbigniew Wodecki', id: 3 },
      { name: 'Adam Małysz', id: 4 },
    ],
    offices: ['brazil'],
    positions: ['your mom'],
  };

  constructor(    private readonly _cdRef: ChangeDetectorRef){}

  selectEntry(id: number){
    this.personResponse = {
      first_name: "Steve",
      last_name: "Gomez",
      position: "Mechanik",
      id: id,
      salary: 12.3,
      shift_start: "08:00",
      shift_end: "20:00",
      office: "Gliwice",
    }
  }
}
