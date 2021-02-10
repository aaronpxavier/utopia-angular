import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { TravelerModel, TravelerRequest } from 'src/app/shared/models/types';
import { ServiceErrorHandler } from 'src/app/utility/service-error-handler';
import { environment } from 'src/environments/environment';
import { Response } from '../../../shared/models/api-response-types';

@Injectable({
  providedIn: 'root'
})
export class TravelerService {

  private apiUrl = environment.FLIGHTS_API;

  constructor(
    private http: HttpClient,
    private errorHandler: ServiceErrorHandler
  ) { }

  updateTraveler(newTraveler: TravelerRequest): Observable<Response<TravelerModel>> {
    return this.http.put<TravelerModel>(this.apiUrl + '/traveler', newTraveler)
      .pipe(
        map(traveler => ({ data: traveler, error: null })),
        catchError((error) => this.errorHandler.handleError<TravelerModel>(error, 'Sorry! There was an error updating the traveler. Please try again.')),
        startWith({ data: null, error: null })
      );
  }

  addTraveler(newTraveler: TravelerRequest, bookingId: number): Observable<Response<TravelerModel>> {
    return this.http.post<TravelerModel>(this.apiUrl + '/traveler/booking/' + bookingId, newTraveler)
      .pipe(
        map(traveler => ({ data: traveler, error: null })),
        catchError((error) => this.errorHandler.handleError<TravelerModel>(error, 'Sorry! There was an error adding the traveler. Please try again.')),
        startWith({ data: null, error: null })
      );
  }

  deleteTraveler(travelerId: number): Observable<Response<boolean>> {
    return this.http.delete<boolean>(this.apiUrl + '/traveler/' + travelerId)
      .pipe(
        map(traveler => ({ data: true, error: null })),
        catchError((error) => this.errorHandler.handleError<boolean>(error, 'Sorry! There was an error deleting the traveler. Please try again.')),
        startWith({ data: null, error: null })
      );
  }
}
