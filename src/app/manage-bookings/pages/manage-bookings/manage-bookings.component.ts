import { Response } from 'src/app/shared/models/api-response-types';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';
import { Bookings, BookingService } from '../../services/booking.service';
import { tap } from 'rxjs/operators';
import { BookingModel } from '../../models/booking-types';

enum Tab {
  ACTIVE = 'active',
  HISTORY = 'history'
}

@Component({
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {

  bookings$: Observable<Response<Bookings>>;
  shouldShowError = true;
  // TODO: reset on tab change
  selectedBooking: BookingModel;
  selectedTab = Tab.ACTIVE;

  constructor(
    private toolbarService: ToolbarService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.toolbarService.emitRouteChangeEvent('Manage Bookings');
    this.fetchBookingsAndSelectFirst();
  }

  fetchBookingsAndSelectFirst(): void {
    this.bookings$ = this.bookingService.getBookingsForUser()
      .pipe(tap(this.selectFirstBooking));
  }

  private selectFirstBooking = ({ data, error }: Response<Bookings>): void => {
    if (data && data[Tab.ACTIVE].length > 0) {
      this.selectedBooking = data[Tab.ACTIVE][0];
    } else if (data) {
      // TODO: Display message to user that they have no bookings
      console.error('You have no bookings');
    } else if (error) {
      console.error(error);
    }
  }

  onBookingClick(booking: BookingModel): void {
    this.selectedBooking = booking;
  }

  onTabChange(index: number): void {
    this.selectedTab = this.selectedTab === Tab.ACTIVE ? Tab.HISTORY : Tab.ACTIVE;
  }
}
