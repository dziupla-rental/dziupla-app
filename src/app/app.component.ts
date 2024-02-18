import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InMemoryDataService } from './services/in-memory-data.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { HttpClientModule } from '@angular/common/http';

const MATERIALS = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
];
export enum Role {
  ADMIN = 'ROLE_ADMIN',
  EMP_HR = 'ROLE_EMPLOYEE_HR',
  USER = 'ROLE_USER',
  EMP = 'ROLE_EMPLOYEE',
  EMP_MECH = 'ROLE_EMPLOYEE_MECHANIC',
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MATERIALS, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  private role?: Role;

  isLoggedIn = false;
  isShowOwnerBoard = false;
  isShowManagementBoard = false;
  username?: string;
  title = 'dziupla-app';

  showFiller = false;
  constructor(
    private readonly _data: InMemoryDataService,
    private readonly _storageService: StorageService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  onClick() {
    this._data.getVehicles([2, 5]).subscribe((vehicles) => {});
  }

  ngOnInit(): void {
    if (this._storageService.isLoggedIn()) {
      const user = this._storageService.getUser();

      if (user) {
         this.role = user.roles as Role;
         this.isLoggedIn = true;

          this.isShowOwnerBoard = this.role == Role.ADMIN;
          this.isShowManagementBoard =
            this.role == Role.ADMIN || this.role == Role.EMP_HR;

          this.username = user.username;
      }
    }
  }

  onLogout(): void {
    this._authService.logout().subscribe({
      next: (_) => {
        this._storageService.clean();

        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onLogin(): void {
    this._router.navigate(['/login']);
  }
  navigate(location: String): void {
    this._router.navigate([location]);
  }
}
