import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent, PersonData } from './employee-details/employee-details.component';

export interface EmployeeListing {
  name: string;
  id: number;
}
export interface ManagementData {
  employees: EmployeeListing[];
  offices: string[];
  positions: string[];
}

@Component({
  selector: 'app-management-view',
  standalone: true,
  imports: [
    MatCardModule,
    FlexLayoutModule,
    EmployeeListComponent,
    EmployeeDetailsComponent,
  ],
  templateUrl: './management-view.component.html',
  styleUrl: './management-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementViewComponent {
  personResponse? : PersonData= {
    first_name: "Steve",
    last_name: "Gomez",
    position: "Mechanik",
    id: 12,
    salary: 12.3,
    shift_start: 800,
    shift_end: 2000,
    office: "Gliwice",
    };
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
}
