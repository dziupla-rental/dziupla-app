import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';
import { PercentageIndicatorComponent } from '../percentage-indicator/percentage-indicator.component';
import {MatCardModule} from '@angular/material/card';
import { FinancialReportComponent } from '../financial-report/financial-report.component';
import { GeneralStatsComponent } from '../general-stats/general-stats.component';

@Component({
  selector: 'app-owner-view',
  standalone: true,
  imports: [MatGridListModule, PercentageIndicatorComponent, MatCardModule, FinancialReportComponent, GeneralStatsComponent],
  templateUrl: './owner-view.component.html',
  styleUrl: './owner-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OwnerViewComponent  {


}
