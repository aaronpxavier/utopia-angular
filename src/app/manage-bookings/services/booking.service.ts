import { Response } from 'src/app/shared/models/api-response-types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, reduce, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BookingModel } from '../models/booking-types';

export interface Bookings {
  active: BookingModel[];
  history: BookingModel[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly apiUrl = environment.FLIGHTS_API;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<Response<Bookings>> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of({ data: null, error: 'Sorry! There was an error loading your bookings. Please try again.' });
  }

  bookingIsActive = (booking: BookingModel): boolean => {
    return booking.flights.some(flight => (
      new Date(flight.departTime).getTime() > Date.now()
    ));
  }

  separateActiveAndPastBookings = (bookings: Bookings, booking: BookingModel): Bookings => {
    if (this.bookingIsActive(booking)) {
      bookings.active.push(booking);
    } else {
      bookings.history.push(booking);
    }
    return bookings;
  }

  getBookingsForUser(): Observable<Response<Bookings>> {
    return this.http.get<BookingModel[]>(this.apiUrl + '/booking')
      .pipe(
        map(bookings => ({
          data: bookings.reduce(this.separateActiveAndPastBookings, { active: [], history: [] }),
          error: null
        })),
        catchError(this.handleError),
        startWith({ data: null, error: null })
      );
  }
}
