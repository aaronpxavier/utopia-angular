import {Component, Input, OnInit, Output} from '@angular/core';
import {Flight} from '../../models/flight';

@Component({
  selector: 'app-flight-booking-info-box',
  templateUrl: './flight-booking-info-box.component.html',
  styleUrls: ['./flight-booking-info-box.component.scss']
})
export class FlightBookingInfoBoxComponent implements OnInit {

  constructor() { }

  @Input() departingFlight: Flight;
  @Input() arrivingFlight: Flight;
  @Output() nextButtonClick: Flight;
  @Output() backButtonClick: Flight;
  currentState = 'Select Departure';

  ngOnInit(): void {
  }

}
