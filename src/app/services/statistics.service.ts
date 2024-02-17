import { Injectable } from '@angular/core';
import { Statistics } from '../components/owner-view/owner-view.component';
import { Observable, delay, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const STATISTICS_API = `${environment.apiUrl}/statistics`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'any',
})
export class StatisticsService {
  constructor(private readonly _http: HttpClient) {}

  getStatistics(): Observable<Statistics | null> {
    return this._http.get<Statistics | null>(`${STATISTICS_API}`, httpOptions);
  }
}
