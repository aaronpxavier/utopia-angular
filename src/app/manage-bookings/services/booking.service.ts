import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BookingModel } from '../models/booking-types';

export interface BookingResponse {
  bookings: null | BookingModel[];
  error: null | string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly apiUrl = environment.FLIGHTS_API;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<BookingResponse> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of({ bookings: null, error: 'Sorry! There was an error loading your bookings. Please try again.' });
  }

  getBookingsForUser(): Observable<BookingResponse> {
    return this.http.get<BookingModel[]>(this.apiUrl + '/booking')
      .pipe(
        map(bookings => ({ bookings, error: null })),
        catchError(this.handleError),
        startWith({ bookings: null, error: null })
      );
  }
}
