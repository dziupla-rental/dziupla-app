import { StickyDirection } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import SillyGraph from 'silly-graphs';

interface IPoint {
  x: number;
  y: number;
}
interface IAxisData {
  min?: number;
  max?: number;
  labels: number|number[]|string[];
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
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class FinancialReportComponent implements OnInit{
  canvas: HTMLElement | null = null;
  sillyGraph: SillyGraph | null = null;
  @Input() data : Array<number> = [];
  graphData: IGraphData = {};
parseData(){
  if(this.data?.length > 0) {
    console.log("parsing", this.data);
    const max = Math.max.apply(Math, this.data);
    let min = Math.min.apply(Math, this.data);
    if(min === max) {min = 0;}
    
    let points: IPoint[] = [];
    this.data.reverse().forEach((entry, index) => {
      points.push({"x": 23-index, "y": entry})
    });

    const today = new Date();
    const startMonth = today.getMonth()+1;
    const startYear = today.getFullYear()-2;
    const labelsX: string[] = Array.from({length: 24}, (v, i) => {return String(1+(startMonth+i)%12)+'-'+String(startYear+((Math.floor((i+1)/12))))});
    let parsedObject: IGraphData = {
      "axisY":{ 
        "min" : 0,
        "max" : max, 
        "labels" : 5,
        "labelTemplate" : "# zł"
      },
      "axisX":{
        "labels": labelsX,
      },
      "config":{"lineWidth":3},
      "points": points,
    };

    return parsedObject;
  }
  return {}
}
  ngOnInit() {
    this.canvas = document.getElementById('financeGraph')
    console.log("inited");
    if(this.canvas){ 
      this.sillyGraph = new SillyGraph(this.canvas);
      this.sillyGraph.load(this.graphData);
    
    }
  }
  ngOnChanges(){
    this.graphData = this.parseData();
    this.sillyGraph?.load(this.graphData);
  }
}
