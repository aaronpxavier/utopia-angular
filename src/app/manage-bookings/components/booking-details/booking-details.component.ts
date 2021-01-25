import { AirportService } from './../../../services/airport.service';
import { BookingModel } from './../../models/booking-types';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/models/api-response-types';
import { AirportModel } from 'src/app/shared/models/types';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  @Input() booking: BookingModel;
  currentDate = Date.now();
  expandedIndex = 0;
  airports$: Observable<Response<AirportModel[]>>;

  constructor(
    private airportService: AirportService
  ) { }

  ngOnInit(): void {
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
