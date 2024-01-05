import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeListComponent } from './employee-list/employee-list.component';

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
  imports: [MatCardModule, FlexLayoutModule, EmployeeListComponent],
  templateUrl: './management-view.component.html',
  styleUrl: './management-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementViewComponent {
  responseData?: ManagementData = {
    "employees": [
      { name: 'John Deere', id: 1 },
      { name: 'Jan Paweł 2', id: 2 },
      { name: 'Zbigniew Wodecki', id: 3 },
      { name: 'Adam Małysz', id: 4 },
      ],
    "offices": [
      "brazil",
    ],
    "positions": [
      "your mom",
    ],
  };


}
