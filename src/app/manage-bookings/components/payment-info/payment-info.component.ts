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

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getBookingCost(booking: BookingModel): number {
    return getBookingCost(booking);
  }
}
