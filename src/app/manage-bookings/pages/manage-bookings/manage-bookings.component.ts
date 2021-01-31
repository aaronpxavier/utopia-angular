import { BookingListModalService } from './../../services/booking-list-modal.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingModel } from './../../models/booking-types';
import { Component, OnInit } from '@angular/core';
import { BookingListModalComponent } from '../../components/booking-list-modal/booking-list-modal.component';

@Component({
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {

  selectedBooking: BookingModel;
  isHistory: boolean;

  constructor(
    private dialog: MatDialog,
    private bookingListModalService: BookingListModalService
  ) { }

  ngOnInit(): void {
    this.bookingListModalService.bookingSelected.subscribe((booking: BookingModel) => {
      this.selectedBooking = booking;
    });
    this.bookingListModalService.isHistory.subscribe((isHistory: boolean) => {
      this.isHistory = isHistory;
    });
  }

  onBookingChange(booking: BookingModel): void {
    this.selectedBooking = booking;
  }

  onTabChange(isHistory: boolean): void {
    this.isHistory = isHistory;
  }

  onViewBookingList(): void {
    this.dialog.open(BookingListModalComponent, {
      maxWidth: '100vw'
    });
  }
}
