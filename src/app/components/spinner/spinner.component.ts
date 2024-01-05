import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MESSAGES: string[] = [
  'Grzebanie w dziupli...',
  'Gonienie pojazdów...',
  'Konferencja w dziupli...',
  'Małpy przeszukują archiwa...',
  'Gdzie te orzechy?..',
];

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  message: string = '';

  constructor() {
    this.message = MESSAGES[this.getRandomInt(MESSAGES.length)];
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
