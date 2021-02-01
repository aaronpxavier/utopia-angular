import { BookingListModalService } from './../../services/booking-list-modal.service';
import { ActionModalData } from '../confirm-action-modal/confirm-action-modal.component';
import { getBookingCost } from 'src/app/utility/bookingCost';
import { Response } from 'src/app/shared/models/api-response-types';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookings, BookingService } from '../../../services/booking/booking.service';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionModalComponent } from '../confirm-action-modal/confirm-action-modal.component';
import { BookingModel } from 'src/app/shared/models/types';

enum Tab {
  ACTIVE = 'active',
  HISTORY = 'history'
}

@Component({
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  selector: 'app-booking-list'
})
export class BookingListComponent implements OnInit, AfterViewInit {

  bookings$: Observable<Response<Bookings>>;
  shouldShowError = true;
  // TODO: reset on tab change
  private booking: BookingModel;
  private tab = Tab.ACTIVE;

  @Output() selectedBookingChange = new EventEmitter<BookingModel>();
  @Output() isHistory = new EventEmitter<boolean>();

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private bookingListModalService: BookingListModalService
  ) { }

  get selectedBooking(): BookingModel {
    return this.booking;
  }

  set selectedBooking(booking: BookingModel) {
    this.booking = booking;
    this.selectedBookingChange.emit(booking);
  }

  get selectedTab(): Tab {
    return this.tab;
  }

  set selectedTab(tab: Tab) {
    this.tab = tab;
    this.isHistory.emit(this.tab === Tab.HISTORY);
    this.bookingListModalService.isHistory.emit(this.tab === Tab.HISTORY);
  }

  ngOnInit(): void {
    this.fetchBookingsAndSelectFirst();
  }

  ngAfterViewInit(): void {
    // TODO: find a better solution
    // causes ExpressionChangedAfterUpdate error without the setTimeout
    setTimeout(() => { this.selectedTab = Tab.ACTIVE; });
  }

  onHistoryTab(): boolean {
    return this.selectedTab === Tab.HISTORY;
  }

  fetchBookingsAndSelectFirst(): void {
    this.bookings$ = this.bookingService.getBookingsForUser()
      .pipe(tap(this.selectFirstBooking));
  }

  private selectFirstBooking = ({ data: bookings, error }: Response<Bookings>): void => {
    if (bookings && bookings[this.selectedTab].length > 0) {
      this.selectedBooking = bookings[this.selectedTab][0];
    } else if (bookings) {
      // TODO: Display message to user that they have no bookings
      console.error('You have no bookings');
      this.selectedBooking = null;
    } else if (error) {
      console.error(error);
    }
  }

  onBookingClick(booking: BookingModel): void {
    this.selectedBooking = booking;
  }

  onTabChange(bookings: Response<Bookings>): void {
    this.selectedTab = this.selectedTab === Tab.ACTIVE ? Tab.HISTORY : Tab.ACTIVE;
    this.selectFirstBooking(bookings);
  }

  onDeleteBooking(booking: BookingModel): void {
    const modalData: ActionModalData = {
      title: 'Confirm Booking Cancellation',
      content: `Are you sure you want to permanently delete this booking?
        Your card ending in 9999 will be refunded $${getBookingCost(booking)}.`,
      action$: this.bookingService.deleteBooking(booking.bookingId),
      successMessage: 'Booking deleted successfully.',
      failureMessage: 'Failed to delete booking. Please try again.'
    };
    const dialogRef = this.dialog.open(ConfirmActionModalComponent, {
      width: '400px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(bookingDeleted => {
      if (bookingDeleted) {
        this.fetchBookingsAndSelectFirst();
      }
    });
  }
}
