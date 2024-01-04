import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

export interface StatElement {
  name: string;
  icon: string;
  value: number;
}

const ELEMENT_DATA: StatElement[] = [
  {name: 'Liczba aut', icon: 'directions_car', value: 2137},
  {name: 'Liczba aut wyporzyczonych', icon: 'sell', value: 2137},
  {name: 'Liczba aut serwisie', icon: 'build', value: 2137},
  {name: 'Liczba aut w lokalach', icon: 'home', value: 2137},
  {name: 'Liczba klientów', icon: 'face', value: 2137},
  {name: 'Liczba lokali', icon: 'store', value: 2137},
  {name: 'Liczba pracowników', icon: 'accessibility', value: 2137},
  
];

@Component({
  selector: 'app-general-stats',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCardModule],
  templateUrl: './general-stats.component.html',
  styleUrl: './general-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class GeneralStatsComponent {
  displayedColumns: string[] = ['icon', 'name', 'value'];
  dataSource = ELEMENT_DATA;
}




