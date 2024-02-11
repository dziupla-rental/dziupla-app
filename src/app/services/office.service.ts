import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Office } from '../components/office-view/office-view.component';

const OFFICE_API = `${environment.apiUrl}/office`;



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'any'
})
export class OfficeService {

  constructor(private readonly _http: HttpClient) { }
  getOffices(): Observable<Office[]|null> {
    return this._http.get<Office[]|null>(
      OFFICE_API,
      httpOptions
    );
  }

  getOffice(id: number): Observable<any> {
    return this._http.get(
      `${OFFICE_API}/${String(id)}`,
      httpOptions
    );
  }
  putOffice(off: Office): Observable<any> {
    return this._http.put(
      OFFICE_API,
      off,
      httpOptions
    );
  }
  // create a brand new office
  postOffice(off: Office): Observable<any> {
    return this._http.post(
      OFFICE_API,
      {location:off.location},
      httpOptions
    );
  }

  deleteOffice(id: number): Observable<any> {
    return this._http.delete(
      `${OFFICE_API}/${String(id)}`,
      httpOptions
    );
  }



}
