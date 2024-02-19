import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Vehicle } from '../../../model/external/vehicle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CarChipComponent } from './car-chip/car-chip.component';
import { VehicleChip } from '../../../model/internal/vehicle-chip';
import { MatButtonModule } from '@angular/material/button';

const MATERIALS = [MatCardModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, MATERIALS, CarChipComponent],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCardComponent implements OnInit {
  @Input() vehicle?: Vehicle;
  @Input() isShowButton: boolean = true;

  @Output() vehicleSelected: EventEmitter<Vehicle> = new EventEmitter();

  chips: VehicleChip[] = [];
  constructor() {}

  ngOnInit(): void {
    if (!this.vehicle) return;
    this.chips = [
      {
        icon: 'directions_car',
        text: this.vehicle.type,
      },
      {
        icon: 'people_alt',
        text: String(this.vehicle.seatNumber),
      },
      {
        icon: 'attach_money',
        text: this.vehicle.cost + 'zł/d',
      },
    ];
  }

  onOrderClick(): void {
    this.vehicleSelected.emit(this.vehicle);
  }
}
