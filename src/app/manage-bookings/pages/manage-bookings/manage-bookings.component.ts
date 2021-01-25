import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';
import { BookingModel } from '../../models/booking-types';
import { BookingResponse, BookingService } from '../../services/booking.service';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {

  bookings$: Observable<BookingResponse>;
  shouldShowError = true;
  selectedBooking: BookingModel;

  constructor(
    private toolbarService: ToolbarService,
    private bookingService: BookingService,
    // TODO: Remove dialog
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.toolbarService.emitRouteChangeEvent('Manage Bookings');
    this.bookings$ = this.bookingService.getBookingsForUser()
      .pipe(
        tap(({ bookings, error }: BookingResponse) => {
          if (bookings && bookings.length > 0) {
            this.selectedBooking = bookings[0];
          } else if (bookings) {
            // TODO: Display message to user that they have no bookings
            console.error('You have no bookings');
          } else if (error) {
            console.error(error);
          }
        })
      );
  }

  retryBookingRequest(): void {
    this.bookings$ = this.bookingService.getBookingsForUser();
  }

  onBookingClick(booking: BookingModel): void {
    this.selectedBooking = booking;
  }
}
