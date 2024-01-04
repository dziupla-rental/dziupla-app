import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-percentage-indicator',
  standalone: true,
  imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressSpinnerModule],
  templateUrl: './percentage-indicator.component.html',
  styleUrl: './percentage-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PercentageIndicatorComponent {
  @Input() color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  
  @Input() title = 'default';
  @Input() value = 0;
  @Input() hue = 0;
}
