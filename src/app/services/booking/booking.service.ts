import { Response } from 'src/app/shared/models/api-response-types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BookingModel } from 'src/app/shared/models/types';
import { ServiceErrorHandler } from 'src/app/utility/service-error-handler';

export interface Bookings {
  active: BookingModel[];
  history: BookingModel[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly API_URL = environment.FLIGHTS_API;
  private readonly GET_BOOKINGS_ERROR = 'Sorry! There was an error loading your bookings. Please try again.';
  private readonly DELETE_BOOKING_ERROR = 'Sorry! There was an error deleting your booking. Please try again.';

  constructor(private http: HttpClient, private errorHandler: ServiceErrorHandler) { }

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
    return this.http.get<BookingModel[]>(this.API_URL + '/booking')
      .pipe(
        map(bookings => ({
          data: bookings.reduce(this.separateActiveAndPastBookings, { active: [], history: [] }),
          error: null
        })),
        catchError((error: HttpErrorResponse) => this.errorHandler.handleError<Bookings>(error, this.GET_BOOKINGS_ERROR)),
        startWith({ data: null, error: null })
      );
  }

  deleteBooking(bookingId: number): Observable<Response<boolean>> {
    return this.http.delete<string>(
      `${this.API_URL}/booking/${bookingId}`,
      { observe: 'response' }
    )
      .pipe(
        map(res => ({
          data: res.status === 200,
          error: null
        })),
        catchError((error) => this.errorHandler.handleError<boolean>(error, this.DELETE_BOOKING_ERROR)),
        startWith({ data: null, error: null })
      );
  }
}
