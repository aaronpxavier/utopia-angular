import { Response } from './../../shared/models/api-response-types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, startWith } from 'rxjs/operators';
import { AirportModel } from 'src/app/shared/models/types';
import { ServiceErrorHandler } from 'src/app/utility/service-error-handler';

@Injectable({
  providedIn: 'root'
})
export class AirportSearchService {

  private readonly apiUrl = environment.FLIGHTS_API + '/airport?query=';

  constructor(private http: HttpClient, private errorHandler: ServiceErrorHandler) { }

  searchAirports(query: string): Observable<Response<AirportModel[]>> {
    return this.http.get<AirportModel[]>(this.apiUrl + query.trim())
      .pipe(
        map(airports => ({ data: airports, error: null })),
        catchError(error => this.errorHandler.handleError<AirportModel[]>(error, 'Sorry! There was an error finding airports. Please try again.')),
        startWith({ data: null, error: null })
      );
  }
}
