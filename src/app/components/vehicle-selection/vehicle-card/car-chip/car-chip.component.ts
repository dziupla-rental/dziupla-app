import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const MATERIALS = [MatIconModule];

@Component({
  selector: 'app-car-chip',
  standalone: true,
  imports: [CommonModule, MATERIALS],
  templateUrl: './car-chip.component.html',
  styleUrl: './car-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarChipComponent {
  @Input() icon!: string;
  @Input() text!: string;
}
