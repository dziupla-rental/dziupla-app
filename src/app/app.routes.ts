import { Routes } from '@angular/router';
import { OwnerViewComponent } from './components/owner-view/owner-view.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';
import { RegisterViewComponent } from './components/register-view/register-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';

export const routes: Routes = [
  { path: 'owner', component: OwnerViewComponent },
  { path: '', redirectTo: 'vehicle-selection', pathMatch: 'full' },
  { path: 'vehicle-selection', component: VehicleSelectionComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'login', component: LoginViewComponent },
];
