import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { EntryListComponent, ListingRecord } from '../entry-list/entry-list.component';
import { MatIconModule } from '@angular/material/icon';
import {
  EmployeeDetailsComponent,
  Employee,
} from './employee-details/employee-details.component';
import {
  RegisterViewComponent,
} from '../register-view/register-view.component';
import { ManagementService } from '../../services/management.service';
import { Subject, takeUntil } from 'rxjs';
import { Office } from '../office-view/office-view.component';
import { OfficeService } from '../../services/office.service';


export interface ManagementData {
  employees: ListingRecord[];
  offices?: Office[];
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
  private readonly _destroy$ = new Subject<void>();
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

  offices?: Office[];
  employeeEntries?: ListingRecord[]; 
  constructor(
    private managementService: ManagementService,
    private officeService: OfficeService,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  selectEntry(id: number) {
    this.managementService.getEmployee(id).pipe(takeUntil(this._destroy$)).subscribe((employeeResponse) => {
      this.personResponse = employeeResponse;

      this._cdRef.markForCheck();
    });
  }
  fetchEmployees() {
    this.managementService.getEmployees().pipe(takeUntil(this._destroy$)).subscribe((employeeList) => {
      this.employeeEntries = employeeList.map((x: Employee) => ({
          name: x.name && x.lastName ? x.name + ' ' + x.lastName : x.email,
          id: x.id,
        }));
      
      if (this.addNew) {
        this.addNew = false;
        this.askForEdit = true;
      }
      this._cdRef.markForCheck();
    });
  }

  fetchOffices() {
    this.officeService.getOffices().subscribe((officeList) => {
      if(officeList) {this.offices = officeList};
      console.log('Offices:', officeList);
      this._cdRef.markForCheck();
    });
  }

  ngOnInit(): void {
   this.fetchEmployees();
  this.fetchOffices();
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
        this.fetchEmployees(); 
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
