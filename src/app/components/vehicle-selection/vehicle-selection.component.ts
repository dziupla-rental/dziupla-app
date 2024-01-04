import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InMemoryDataService } from '../../services/in-memory-data.service';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-vehicle-selection',
  standalone: true,
  imports: [CommonModule, FiltersComponent],
  templateUrl: './vehicle-selection.component.html',
  styleUrl: './vehicle-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleSelectionComponent {
  constructor(private readonly _data: InMemoryDataService) {}
}
