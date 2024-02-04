import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { MatIconModule } from '@angular/material/icon';
import {
  EmployeeDetailsComponent,
  Employee,
} from './employee-details/employee-details.component';
import {
  RegisterViewComponent,
} from '../register-view/register-view.component';
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
    RegisterViewComponent,
    EntryListComponent,
    EmployeeDetailsComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './management-view.component.html',
  styleUrl: './management-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementViewComponent implements OnInit {
  addNew: boolean = false;
  askForEdit: boolean = false;
  personResponse?: Employee;
  positions: string[] = [
    'ROLE_USER',
    'ROLE_MODERATOR',
    'ROLE_ADMIN',
    'ROLE_EMPLOYEE',
    'ROLE_EMPLOYEE_HR',
    'ROLE_EMPLOYEE_MECHANIC',
  ];
  responseData?: ManagementData;

  constructor(
    private managementService: ManagementService,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  selectEntry(id: number) {
    this.managementService.getEmployee(id).subscribe((employeeResponse) => {
      this.personResponse = employeeResponse;

      this._cdRef.markForCheck();
    });
  }
  fetchEmployees() {
    this.managementService.getEmployees().subscribe((employeeList) => {
      this.responseData = {
        employees: employeeList.map((x: Employee) => ({
          name: x.name && x.lastName ? x.name + ' ' + x.lastName : x.email,
          id: x.id,
        })),
      };
      if (this.addNew) {
        this.addNew = false;
        this.askForEdit = true;
      }
      this._cdRef.markForCheck();
    });
  }
  ngOnInit(): void {
    this.fetchEmployees();
  }
  modifyEmployee(employee: Employee) {
    console.log('mg view', employee);
    this.askForEdit = false;
    this.managementService
      .putEmployee(employee)
      .subscribe((employeeResponse) => {
        this.personResponse = employeeResponse;

        this.fetchEmployees();
      });
  }
  deleteEmployee(employee: Employee) {
    console.log('mg delete', employee);

    this.managementService
      .deleteEmployee(employee.id)
      .subscribe((employeeResponse) => {
        console.log(employeeResponse);
        this.fetchEmployees(); // this updates the list, it's should probably be done some other way :3
      });
  }
  createEmployee() {

    console.log('adding new employee');
    this.addNew = true;
  }
  createEmployeeCancel() {
    this.addNew = false;
    this.askForEdit = false;
  }
  registered(employee: Employee | null) {
    console.log('new employee', employee);
    if(employee){
      this.personResponse = employee;
    }
    this.fetchEmployees();
  }
}
