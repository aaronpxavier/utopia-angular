import { ConfirmActionModalComponent } from './../confirm-action-modal/confirm-action-modal.component';
import { BookingModel } from './../../models/booking-types';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getBookingCost } from 'src/app/utility/bookingCost';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  @Input() booking: BookingModel;

  @Output() deleteBooking = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getBookingCost(booking: BookingModel): number {
    return getBookingCost(booking);
  }

  onDeleteBooking(): void {
    const dialogRef = this.dialog.open(ConfirmActionModalComponent, {
      width: '400px',
      data: {
        title: 'Confirm Booking Cancellation',
        message: `Are you sure you want to permanently delete this booking?
        Your card ending in 9999 will be refunded $${getBookingCost(this.booking)}.`
      }
    });

    dialogRef.afterClosed().subscribe(shouldDeleteBooking => {
      if (shouldDeleteBooking) {
        this.deleteBooking.emit();
      }
    });
  }
}
