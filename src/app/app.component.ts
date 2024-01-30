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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MATERIALS, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private role: string = "";
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
      this.role = user.role;
      this.isLoggedIn = true;

      //TODO: export roles into enum
      this.isShowOwnerBoard = this.role.includes('ROLE_OWNER');
      this.isShowManagementBoard = this.role.includes('ROLE_MANAGER');

      this.username = user.username;
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
}
