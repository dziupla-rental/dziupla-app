import { Injectable } from '@angular/core';
import { IStatistics } from '../owner-view/owner-view.component';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private _response =
    '{"cars_total":680,"cars_rented":40,"cars_service":300,"employees_total":8,"offices_total":4,"clients_total":200,"earnings_stats":[211.3,223.1,421.1,211.3,223.1,421.1,900,223.1,421.1,211.3,223.1,421.1,-200]}';

  constructor() {}

  getStatistics(): Observable<string> {
    return of(this._response).pipe(delay(1000));
  }
}
