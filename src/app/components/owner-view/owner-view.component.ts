import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { PercentageIndicatorComponent } from './percentage-indicator/percentage-indicator.component';
import { MatCardModule } from '@angular/material/card';
import { FinancialReportComponent } from './financial-report/financial-report.component';
import { GeneralStatsComponent } from './general-stats/general-stats.component';
import { StatisticsService } from '../../services/statistics.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Subject, takeUntil } from 'rxjs';

export interface Statistics {
  carCount: number;
  rentedCars: number;
  servicedCars: number;
  employeeCount: number;
  officeCount: number;
  clientCount: number;
  income: number[];
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
    FlexLayoutModule,
    SpinnerComponent,
  ],
  templateUrl: './owner-view.component.html',
  styleUrl: './owner-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnerViewComponent implements OnInit {
  private readonly _destroy$ = new Subject<void>();
  statistics?: Statistics;

  constructor(
    private statisticsService: StatisticsService,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.statisticsService
      .getStatistics()
      .pipe(takeUntil(this._destroy$))
      .subscribe((stats) => {
        this.statistics = stats || undefined;
        this._cdRef.markForCheck();
      });
  }

  round(x: number): number {
    return Math.round(x);
  }
}
