import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-general-stats',
  standalone: true,
  imports: [],
  templateUrl: './general-stats.component.html',
  styleUrl: './general-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralStatsComponent {

}
