import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Employee } from '../components/management-view/employee-details/employee-details.component';

const AUTH_API = `${environment.apiUrl}/auth/`;

//TODO: create http interceptor for this
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'any',
})
export class AuthService {
  constructor(private readonly _http: HttpClient) {}

  //TODO: add type
  login(username: string, password: string): Observable<any> {
    return this._http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  //TODO: add type
  register(username: string, email: string, password: string, endpoint?: string): Observable<Employee|null> {
    return this._http.post<Employee|null>(
      AUTH_API + 'signup' + (endpoint ? `/${endpoint}`: ''),
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  //TODO: add type
  logout(): Observable<any> {
    return this._http.post(AUTH_API + 'signout', {}, httpOptions);
  }


}
