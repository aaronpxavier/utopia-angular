import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/flight-booking/services/flights.service';
import {Flight} from '../../models/flight';
import {TripType} from '../../models/types';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  templateUrl: './flight-results-page.component.html',
  styleUrls: ['./flight-results-page.component.scss']
})
export class FlightResultsPageComponent implements OnInit {

  departureFlights = new Array<Flight>();
  returnFlights = new Array<Flight>();
  tripType: TripType;
  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    this.tripType = this.flightService.flightRequest.tripType;
    this.flightService.departureFlights.subscribe(flights => {
      if (flights) {
        flights.forEach(flt => this.departureFlights.push(flt));
      }
    });
    this.flightService.returnFlights.subscribe(flights => {
      if (flights) {
        flights.forEach(flt => this.returnFlights.push(flt));
      }
    });
  }

}
