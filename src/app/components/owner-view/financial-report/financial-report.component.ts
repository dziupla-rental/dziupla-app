import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  Input,
  OnChanges,
  OnInit,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import SillyGraph from 'silly-graphs';

interface IPoint {
  x: number;
  y: number;
}
interface IAxisData {
  min?: number;
  max?: number;
  labels: number | number[] | string[];
  labelTemplate?: string;
}
interface IGrapConfig {
  lineWidth?: number;
  color?: string;
}
interface IGraphData {
  axisX?: IAxisData;
  axisY?: IAxisData;
  config?: IGrapConfig;
  points?: IPoint[];
}
@Component({
  selector: 'app-financial-report',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './financial-report.component.html',
  styleUrl: './financial-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialReportComponent implements OnChanges, AfterViewInit {
  @ViewChild('financeGraph') canvas!: ElementRef;
  @Input() data: Array<number> = [];

  sillyGraph?: SillyGraph;
  graphData: IGraphData = {};

  parseData(): IGraphData {
    const max: number = Math.max(...this.data);

    let points: IPoint[] = this.data
      .reverse()
      .map((entry, index) => ({ x: 23 - index, y: entry }));

    const today = new Date();
    const startMonth = today.getMonth();
    const startYear = today.getFullYear() - 2;
    const labelsX: string[] = Array.from({ length: 24 }, (v, i) => {
      return (
        String(1 + ((startMonth + i) % 12)) +
        '-' +
        String(startYear + Math.floor((i + 1) / 12))
      );
    });
    let parsedObject: IGraphData = {
      axisY: {
        min: 0,
        max: max,
        labels: 5,
        labelTemplate: '# zł',
      },
      axisX: {
        labels: labelsX,
      },
      config: { lineWidth: 3 },
      points: points,
    };
    return parsedObject;
  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.sillyGraph = new SillyGraph(this.canvas.nativeElement);
      this.sillyGraph.load(this.graphData);
    }
  }

  ngOnChanges(): void {
    this.graphData = this.data?.length > 0 ? this.parseData() : {};
    this.sillyGraph?.load(this.graphData);
  }
}
