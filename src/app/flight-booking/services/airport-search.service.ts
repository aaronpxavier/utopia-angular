import { Response } from 'src/app/shared/models/api-response-types';
import { environment } from 'src/environments/environment';
import { Airport } from '../models/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportSearchService {

  API_URL =  environment.FLIGHTS_API + '/airport?query=';

  constructor(private http: HttpClient) { }

  private handleError<T>(error: HttpErrorResponse, message: string): Observable<Response<T>> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of({ data: null, error: message });
  }

  searchAirports(query: string): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.API_URL + query.trim());
  }
}
