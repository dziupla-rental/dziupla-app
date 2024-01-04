import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import SillyGraph from 'silly-graphs';
import {MatGridListModule} from '@angular/material/grid-list';
import { PercentageIndicatorComponent } from '../percentage-indicator/percentage-indicator.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-owner-view',
  standalone: true,
  imports: [MatGridListModule, PercentageIndicatorComponent, MatCardModule],
  templateUrl: './owner-view.component.html',
  styleUrl: './owner-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OwnerViewComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const target = event.target as Window
    if(target){
      console.log("innerWidth", target.innerWidth);
      this.sillyGraph?.load(this.dataObject);
    }
  }
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
        // "Paź 2023",
        // "Lis 2023",
        // "Gru 2023",
    ],
    "labelTemplate" : "#"
},
"axisY" : {
    "min" : 0,
    "max" : 100, 
    "labels" : 10,
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
    // {"x": 9, "y": 75},
    // {"x": 10, "y": 65},
    // {"x": 11, "y": 85},
],
"config" : {
    "color" : "red",
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
