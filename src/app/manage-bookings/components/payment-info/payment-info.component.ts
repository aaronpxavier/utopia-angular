import { Component, Input, OnInit  } from '@angular/core';
import { getBookingCost } from 'src/app/utility/bookingCost';
import { BookingModel } from 'src/app/shared/models/types';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  @Input() booking: BookingModel;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  getBookingCost(booking: BookingModel): number {
    return getBookingCost(booking);
  }
}
