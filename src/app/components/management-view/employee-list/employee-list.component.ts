import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { EmployeeListing } from '../management-view.component';
import { MatTableModule } from '@angular/material/table';

const PLACEHOLDER_DATA: EmployeeListing[] = [];

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [SpinnerComponent, MatTableModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnChanges {
  @Input() employees?: EmployeeListing[];

  displayedColumns: string[] = [ 'name', 'id'];
  dataSource = PLACEHOLDER_DATA;
  ngOnChanges(): void {
    if (this.employees) {
      this.dataSource = this.employees;
    }
  }
}
