import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}/test/`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _http: HttpClient) {}

  //TODO: add type
  getPublicContent(): Observable<any> {
    return this._http.get(API_URL + 'all', { responseType: 'text' });
  }
  //TODO: add type
  getUserBoard(): Observable<any> {
    return this._http.get(API_URL + 'user', { responseType: 'text' });
  }
  //TODO: add type
  getModeratorBoard(): Observable<any> {
    return this._http.get(API_URL + 'mod', { responseType: 'text' });
  }
  //TODO: add type
  getAdminBoard(): Observable<any> {
    return this._http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
