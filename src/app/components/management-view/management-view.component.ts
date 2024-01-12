import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntryListComponent } from '../entry-list/entry-list.component';
import {
  EmployeeDetailsComponent,
  PersonData,
} from './employee-details/employee-details.component';
import { ManagementService } from '../../services/management.service';

export interface ListingRecord {
  name: string;
  id: number;
}
export interface ManagementData {
  employees: ListingRecord[];
  offices?: string[];
  positions?: string[];
}
export interface Employee {
  email: string;
  salary: number;
  shiftStart: string;
  shiftEnd: string;
  id: number;
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
export class ManagementViewComponent implements OnInit {
  personResponse?: PersonData;

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
    offices: ['Gliwice', 'Warszawa', 'Katowice'],
    positions: ['Mechanik', 'Kierowca', 'Sprzedawca', 'Właściciel'],
  };

  constructor(
    private managementService: ManagementService,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  selectEntry(id: number) {
    this.managementService.getEmployee(id).subscribe((employeeResponse) =>{
      // employeeResponse.shiftStart = employeeResponse.shiftStart.slice(0,5);
      // employeeResponse.shiftEnd = employeeResponse.shiftEnd.slice(0,5);
      this.personResponse = employeeResponse;
      
      this._cdRef.markForCheck();
    });
  }
  ngOnInit(): void {
    this.managementService.getEmployees().subscribe((employeeList) => {
      this.responseData = {
        employees: employeeList.map((x: Employee) => ({
          name: x.email,
          id: x.id,
        })),
      };
      this._cdRef.markForCheck();
    });
  }
  modifyEmployee(employee: PersonData) {
    console.log('mg view', employee);
    this.personResponse = { ...employee };
  }
}
