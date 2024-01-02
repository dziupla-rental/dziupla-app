import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

const MATERIALS = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MATERIALS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'dziupla-app';

  showFiller = false;
  constructor(private readonly _data: InMemoryDataService) {}

  onClick() {
    this._data.getVehicles([2, 5]).subscribe((vehicles) => {
      console.log(vehicles);
    });
  }
}
