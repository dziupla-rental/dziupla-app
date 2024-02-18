import { Injectable } from '@angular/core';
import { Rental } from '../model/external/rental';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
const RENTAL_URL = environment.apiUrl + '/rental';
@Injectable({
  providedIn: 'any',
})
export class RentalService {
  constructor(private readonly _http: HttpClient) {}

  addRental(rentalInfo: Rental): Observable<Rental> {
    return this._http.post<Rental>(RENTAL_URL, rentalInfo);
  }
}
