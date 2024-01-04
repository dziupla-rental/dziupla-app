import { Routes } from '@angular/router';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicle-selection', pathMatch: 'full' },
  { path: 'vehicle-selection', component: VehicleSelectionComponent },
];
