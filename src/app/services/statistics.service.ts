import { Injectable } from '@angular/core';
import { IStatistics } from '../owner-view/owner-view.component';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  getStatistics(): Observable<string> {
    return of('{"cars_total":68000,"cars_rented":4001,"cars_service":30000,"employees_total":8,"offices_total":4,"clients_total":200,"earnings_stats":[211.3,223.1,421.1,211.3,223.1,421.1,211.3,223.1,421.1,211.3,223.1,421.1,-200]}').pipe(delay(1000));
  }
}
