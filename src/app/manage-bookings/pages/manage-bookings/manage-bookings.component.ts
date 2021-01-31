import { MatSnackBar } from '@angular/material/snack-bar';
import { getBookingCost } from 'src/app/utility/bookingCost';
import { Response } from 'src/app/shared/models/api-response-types';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';
import { Bookings, BookingService } from '../../../services/booking.service';
import { tap } from 'rxjs/operators';
import { BookingModel } from '../../models/booking-types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionModalComponent } from '../../components/confirm-action-modal/confirm-action-modal.component';

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
    private bookingService: BookingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.toolbarService.emitRouteChangeEvent('Manage Bookings');
    this.fetchBookingsAndSelectFirst();
  }

  fetchBookingsAndSelectFirst(): void {
    this.bookings$ = this.bookingService.getBookingsForUser()
      .pipe(tap(this.selectFirstBooking));
  }

  private selectFirstBooking = ({ data: bookings, error }: Response<Bookings>): void => {
    if (bookings && bookings[Tab.ACTIVE].length > 0) {
      this.selectedBooking = bookings[Tab.ACTIVE][0];
    } else if (bookings) {
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

  private deleteBooking(booking: BookingModel): void {
    this.bookingService.deleteBooking(booking.bookingId).subscribe((bookingDeleted: Response<boolean>) => {
      if (bookingDeleted.data) {
        this.snackBar.open('Booking deleted successfully.', 'Close', {
          duration: 3000
        });
      } else if (bookingDeleted.error) {
        this.snackBar.open(bookingDeleted.error, 'Close', {
          duration: 3000
        });
      }
    });
  }

  onDeleteBooking(booking: BookingModel): void {
    const dialogRef = this.dialog.open(ConfirmActionModalComponent, {
      width: '400px',
      data: {
        title: 'Confirm Booking Cancellation',
        message: `Are you sure you want to permanently delete this booking?
        Your card ending in 9999 will be refunded $${getBookingCost(booking)}.`
      }
    });

    dialogRef.afterClosed().subscribe(shouldDeleteBooking => {
      if (shouldDeleteBooking) {
        this.deleteBooking(booking);
      }
    });
  }
}
