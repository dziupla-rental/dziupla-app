import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import SillyGraph from 'silly-graphs';
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
  dataObject = {"axisX" : {
    "labels" : [
        "Sty 2023",
        "Lut 2023",
        "Mar 2023",
        "Kwi 2023",
        "Maj 2023",
        "Cze 2023",
        "Lip 2023",
        "Sie 2023",
        "Wrz 2023",
        "Paź 2023",
        "Lis 2023",
        "Gru 2023",
    ],
    "labelTemplate" : "#"
},
"axisY" : {
    "min" : 0,
    "max" : 100, 
    "labels" : 5,
    "labelTemplate" : "# zł"
},
"points" : [
    {"x": 0, "y": 5},
    {"x": 1, "y": 15},
    {"x": 2, "y": 50},
    {"x": 3, "y": 23},
    {"x": 4, "y": 34},
    {"x": 5, "y": 78},
    {"x": 6, "y": 0},
    {"x": 7, "y": 100},
    {"x": 8, "y": 5},
    {"x": 9, "y": 75},
    {"x": 10, "y": 65},
    {"x": 11, "y": 85},
],
"config" : {
    // "color" : "red",
    "lineWidth": 3,
}
};
  ngOnInit() {
    this.canvas = document.getElementById('financeGraph')
    if(this.canvas){
      
      
      this.sillyGraph = new SillyGraph(this.canvas);

    this.sillyGraph?.load(this.dataObject);
    }

  }
}
