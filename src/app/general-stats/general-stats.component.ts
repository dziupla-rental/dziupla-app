import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { IStatistics } from '../owner-view/owner-view.component';
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
  displayedColumns: string[] = ['icon', 'name', 'value'];
  @Input() stats?: IStatistics;
  parseInput(): StatElement[] {
    if (this.stats) {
      return [
        {
          name: 'Liczba aut',
          icon: 'directions_car',
          value: this.stats.cars_total,
        },
        {
          name: 'Liczba aut wypożyczonych',
          icon: 'sell',
          value: this.stats.cars_rented,
        },
        {
          name: 'Liczba aut w serwisie',
          icon: 'build',
          value: this.stats.cars_service,
        },
        {
          name: 'Liczba aut w lokalach',
          icon: 'home',
          value:
            this.stats.cars_total -
            this.stats.cars_rented -
            this.stats.cars_service,
        },
        {
          name: 'Liczba klientów',
          icon: 'face',
          value: this.stats.clients_total,
        },
        {
          name: 'Liczba lokali',
          icon: 'store',
          value: this.stats.offices_total,
        },
        {
          name: 'Liczba pracowników',
          icon: 'accessibility',
          value: this.stats.employees_total,
        },
      ];
    }
    return PLACEHOLDER_DATA;
  }
  ngOnChanges(): void {
    this.dataSource = this.parseInput();
  }
  dataSource = PLACEHOLDER_DATA;
}
