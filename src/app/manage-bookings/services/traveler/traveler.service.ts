import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { TravelerModel, TravelerRequest } from 'src/app/shared/models/types';
import { environment } from 'src/environments/environment';
import { Response } from '../../../shared/models/api-response-types';

@Injectable({
  providedIn: 'root'
})
export class TravelerService {

  private apiUrl = environment.FLIGHTS_API;

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(error: HttpErrorResponse): Observable<Response<T>> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of({ data: null, error: 'Sorry! There was an error updating traveler. Please try again.' });
  }

  updateTraveler(newTraveler: TravelerRequest): Observable<Response<TravelerModel>> {
    return this.http.put<TravelerModel>(this.apiUrl + '/traveler', newTraveler)
      .pipe(
        map(traveler => ({ data: traveler, error: null })),
        catchError((error) => this.handleError<TravelerModel>(error)),
        startWith({ data: null, error: null })
      );
  }

  addTraveler(newTraveler: TravelerRequest, bookingId: number): Observable<Response<TravelerModel>> {
    return this.http.post<TravelerModel>(this.apiUrl + '/traveler/booking/' + bookingId, newTraveler)
      .pipe(
        map(traveler => ({ data: traveler, error: null })),
        catchError((error) => this.handleError<TravelerModel>(error)),
        startWith({ data: null, error: null })
      );
  }

  deleteTraveler(travelerId: number): Observable<Response<boolean>> {
    return this.http.delete<boolean>(this.apiUrl + '/traveler/' + travelerId)
      .pipe(
        map(traveler => ({ data: true, error: null })),
        catchError((error) => this.handleError<boolean>(error)),
        startWith({ data: null, error: null })
      );
  }
}
