import { AirportService } from './../../../services/airport.service';
import { BookingModel } from './../../models/booking-types';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/models/api-response-types';
import { AirportModel } from 'src/app/shared/models/types';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit, OnChanges {

  @Input() booking: BookingModel;
  expandedIndex = 0;
  airports$: Observable<Response<AirportModel[]>>;

  constructor(
    private airportService: AirportService
  ) { }

  ngOnInit(): void {
  }

  // TODO: cache loaded flights in session storage to prevent loading duplicate flights
  ngOnChanges(): void {
    this.airports$ = this.airportService.getAirportList(
      this.booking.flights
        .flatMap(flight => [
          flight.flightDetails.arriveCityId,
          flight.flightDetails.departCityId
        ])
    );
  }

  getAirport(airports: AirportModel[], id: string): AirportModel {
    return airports.find(airport => airport.iataIdent === id);
  }
}
