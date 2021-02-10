import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ServiceErrorHandler } from 'src/app/utility/service-error-handler';
import { environment } from 'src/environments/environment';
import { Response } from '../../shared/models/api-response-types';
import { AirportModel } from '../../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private apiUrl = environment.FLIGHTS_API;

  constructor(
    private http: HttpClient,
    private errorHandler: ServiceErrorHandler
  ) { }

  getAirportList(airportIds: string[]): Observable<Response<AirportModel[]>> {
    return this.http.post<AirportModel[]>(this.apiUrl + '/airport/list', airportIds)
      .pipe(
        map(airports => ({ data: airports, error: null })),
        catchError((error) => this.errorHandler.handleError<AirportModel[]>(error, 'Sorry! There was an error retrieving airport info.')),
        startWith({ data: null, error: null })
      );
  }
}
