import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InMemoryDataService } from './services/in-memory-data.service';
import {AuthService } from "./services/auth.service";
import {StorageService} from "./services/storage.service";
import {HttpClientModule} from "@angular/common/http";


const MATERIALS = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MATERIALS, HttpClientModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showOwnerBoard = false;
  showManagementBoard = false;
  username?: string;
  title = 'dziupla-app';

  showFiller = false;
  constructor(private readonly _data: InMemoryDataService,
              private storageService: StorageService,
              private authService: AuthService,
              ) {}

  onClick() {
    this._data.getVehicles([2, 5]).subscribe((vehicles) => {});
  }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showOwnerBoard = this.roles.includes('ROLE_OWNER');
      this.showManagementBoard = this.roles.includes('ROLE_MANAGER');

      this.username = user.username;
    }

  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  login(): void {
    window.location.href = '/login';
  }

}
