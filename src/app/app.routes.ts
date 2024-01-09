import { Routes } from '@angular/router';
import { OwnerViewComponent } from './components/owner-view/owner-view.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

export const routes: Routes = [
  { path: 'owner', component: OwnerViewComponent },
  { path: '', redirectTo: 'vehicle-selection', pathMatch: 'full' },
  { path: 'vehicle-selection', component: VehicleSelectionComponent },
  { path: 'form', component: VehicleFormComponent },
];
