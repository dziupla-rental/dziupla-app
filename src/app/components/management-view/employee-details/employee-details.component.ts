import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

export interface PersonData {
    first_name: string;
    last_name: string;
    position: string;
    id: number;
    salary: number;
    shift_start: number;
    shift_end: number;
    office: string;
}


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsComponent {
  @Input() personData?: PersonData
}
