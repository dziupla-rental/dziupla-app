import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button'
import { EntryListComponent } from '../entry-list/entry-list.component';
import {MatIconModule} from '@angular/material/icon';
import {
  EmployeeDetailsComponent,
  Employee,
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


@Component({
  selector: 'app-management-view',
  standalone: true,
  imports: [
    MatCardModule,
    FlexLayoutModule,
    EntryListComponent,
    EmployeeDetailsComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './management-view.component.html',
  styleUrl: './management-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementViewComponent implements OnInit {
  personResponse?: Employee;
  positions:string[] = [
    'ROLE_USER',
    'ROLE_MODERATOR',
    'ROLE_ADMIN',
    'ROLE_EMPLOYEE',
    'ROLE_EMPLOYEE_HR',
    'ROLE_EMPLOYEE_MECHANIC',
  ];
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

  };

  constructor(
    private managementService: ManagementService,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  selectEntry(id: number) {
    this.managementService.getEmployee(id).subscribe((employeeResponse) => {
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
          name: x.name+' '+x.lastName,
          id: x.id,
        })),
      };
      this._cdRef.markForCheck();
    });
  }
  modifyEmployee(employee: Employee) {
    console.log('mg view', employee);
    this.managementService.putEmployee(employee).subscribe((employeeResponse) => {
      this.personResponse = employeeResponse;

      this._cdRef.markForCheck();
    });

  }
  deleteEmployee(employee: Employee) {
    console.log('mg delete', employee);
    this.managementService.deleteEmployee(employee.id).subscribe((employeeResponse) => {
      console.log(employeeResponse);

      this._cdRef.markForCheck();
      this.ngOnInit(); // this updates the list, it's should probably be done some other way :3
    });

  }
}
