import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

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
export class EmployeeDetailsComponent implements OnChanges {

  @Input() personData?: PersonData


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.personData);
  }
}
