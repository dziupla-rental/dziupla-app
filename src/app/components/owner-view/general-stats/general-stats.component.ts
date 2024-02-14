import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Statistics } from '../owner-view.component';
export interface StatElement {
  name: string;
  icon: string;
  value: number;
}

const PLACEHOLDER_DATA: StatElement[] = [
  { name: 'Liczba aut', icon: 'directions_car', value: NaN },
  { name: 'Liczba aut wyporzyczonych', icon: 'sell', value: NaN },
  { name: 'Liczba aut w serwisie', icon: 'build', value: NaN },
  { name: 'Liczba aut w lokalach', icon: 'home', value: NaN },
  { name: 'Liczba klientów', icon: 'face', value: NaN },
  { name: 'Liczba lokali', icon: 'store', value: NaN },
  { name: 'Liczba pracowników', icon: 'accessibility', value: NaN },
];

@Component({
  selector: 'app-general-stats',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCardModule],
  templateUrl: './general-stats.component.html',
  styleUrl: './general-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatsComponent implements OnChanges {
  @Input() stats?: Statistics;

  displayedColumns: string[] = ['icon', 'name', 'value'];
  dataSource = PLACEHOLDER_DATA;

  parseInput(): StatElement[] {
    if (this.stats) {
      return [
        {
          name: 'Liczba aut',
          icon: 'directions_car',
          value: this.stats.carCount,
        },
        {
          name: 'Liczba aut wypożyczonych',
          icon: 'sell',
          value: this.stats.rentedCars,
        },
        {
          name: 'Liczba aut w serwisie',
          icon: 'build',
          value: this.stats.servicedCars,
        },
        {
          name: 'Liczba aut w lokalach',
          icon: 'home',
          value:
            this.stats.carCount -
            this.stats.rentedCars -
            this.stats.servicedCars,
        },
        {
          name: 'Liczba klientów',
          icon: 'face',
          value: this.stats.clientCount,
        },
        {
          name: 'Liczba lokali',
          icon: 'store',
          value: this.stats.officeCount,
        },
        {
          name: 'Liczba pracowników',
          icon: 'accessibility',
          value: this.stats.employeeCount,
        },
      ];
    }
    return PLACEHOLDER_DATA;
  }
  ngOnChanges(): void {
    this.dataSource = this.parseInput();
  }
}
