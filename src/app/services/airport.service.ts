import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '../shared/models/api-response-types';
import { AirportModel } from '../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private apiUrl = environment.FLIGHTS_API;

  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse): Observable<Response<AirportModel[]>> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of({ data: null, error: 'Sorry! There was an error loading airports. Please try again.' });
  }

  getAirportList(airportIds: string[]): Observable<Response<AirportModel[]>> {
    return this.http.post<AirportModel[]>(this.apiUrl + '/airport/list', airportIds)
      .pipe(
        map(airports => ({ data: airports, error: null })),
        catchError(this.handleError),
        startWith({ data: null, error: null })
      );
  }
}
