import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Employee } from '../components/management-view/employee-details/employee-details.component';


const EMPLOYEE_API = `${environment.apiUrl}/employee`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'any',
})
export class ManagementService {
  constructor(private readonly _http: HttpClient) {}

  //TODO: add type
  getEmployees(): Observable<any> {
    return this._http.get(
      EMPLOYEE_API,
      httpOptions
    );
  }
  getEmployee(id: number): Observable<any> {
    return this._http.get(
      `${EMPLOYEE_API}/${String(id)}`,
      httpOptions
    );
  }
  putEmployee(emp: Employee): Observable<any> {
    return this._http.put(
      EMPLOYEE_API,
      emp,
      httpOptions
    );
  }
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(
      `${EMPLOYEE_API}/${String(id)}`,
      httpOptions
    );
  }
}


