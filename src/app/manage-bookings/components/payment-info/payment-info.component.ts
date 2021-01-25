import { BookingModel } from './../../models/booking-types';
import { Component, Input, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/flight-booking/models/flight';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  @Input() booking: BookingModel;

  constructor() { }

  ngOnInit(): void {
  }

  getBookingCost(booking: BookingModel): number {
    return booking.flights
      .map(flight => flight.price)
      .reduce((total, price) => {
        return total + price * booking.travelers.length;
      }, 0);
  }
}
