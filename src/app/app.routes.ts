import { Routes } from '@angular/router';
import { OwnerViewComponent } from './components/owner-view/owner-view.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';
import { ManagementViewComponent } from './components/management-view/management-view.component';

export const routes: Routes = [
  { path: 'owner', component: OwnerViewComponent },
  { path: 'management', component: ManagementViewComponent },
  { path: '', redirectTo: 'vehicle-selection', pathMatch: 'full' },
  { path: 'vehicle-selection', component: VehicleSelectionComponent },
];
