import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'owner', component: OwnerViewComponent },

  { path: '', redirectTo: 'vehicle-selection', pathMatch: 'full' },
  { path: 'vehicle-selection', component: VehicleSelectionComponent },
];
