import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { PercentageIndicatorComponent } from '../percentage-indicator/percentage-indicator.component';
import { MatCardModule } from '@angular/material/card';
import { FinancialReportComponent } from '../financial-report/financial-report.component';
import { GeneralStatsComponent } from '../general-stats/general-stats.component';
import { StatisticsService } from '../services/statistics.service';

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
  imports: [
    MatGridListModule,
    PercentageIndicatorComponent,
    MatCardModule,
    FinancialReportComponent,
    GeneralStatsComponent,
  ],
  templateUrl: './owner-view.component.html',
  styleUrl: './owner-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnerViewComponent implements OnInit {
  statistics?: IStatistics;
  constructor(
    private statisticsService: StatisticsService,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe((statsJSON) => {
      this.statistics = JSON.parse(statsJSON);
      this._cdRef.markForCheck();
    });
  }
  round(x: number): number {
    return Math.round(x);
  }
}
