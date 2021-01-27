import {Component, Input, OnInit} from '@angular/core';
import {Flight} from '../../models/flight';

@Component({
  selector: 'app-flight-booking-info-box-details',
  templateUrl: './flight-booking-info-box-details.component.html',
  styleUrls: ['./flight-booking-info-box-details.component.scss']
})
export class FlightBookingInfoBoxDetailsComponent implements OnInit {

  @Input() flight: Flight;
  constructor() { }

  ngOnInit(): void {
  }

}
