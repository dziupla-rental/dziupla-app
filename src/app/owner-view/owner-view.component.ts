import { ChangeDetectionStrategy, Component, HostListener, OnInit, Input } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';
import { PercentageIndicatorComponent } from '../percentage-indicator/percentage-indicator.component';
import {MatCardModule} from '@angular/material/card';
import { FinancialReportComponent } from '../financial-report/financial-report.component';
import { GeneralStatsComponent } from '../general-stats/general-stats.component';
import { NumberValueAccessor } from '@angular/forms';

export interface IStatistics {
  cars_total: number;
  cars_rented: number;
  cars_service: number;
  employees_total: number;
  offices_total: number;
  clients_total: number;
  earnings_stats: number[];
}
@Component({
  selector: 'app-owner-view',
  standalone: true,
  imports: [MatGridListModule, PercentageIndicatorComponent, MatCardModule, FinancialReportComponent, GeneralStatsComponent],
  templateUrl: './owner-view.component.html',
  styleUrl: './owner-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OwnerViewComponent  {

 @Input() statistics?:  IStatistics;
  round(x: number){
    return Math.round(x);
  }
}
