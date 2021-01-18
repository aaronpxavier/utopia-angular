import { FlightModel, FlightMultihopModel } from './../../shared/types';
import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/api/flights.service';

@Component({
  templateUrl: './flight-results-page.component.html',
  styleUrls: ['./flight-results-page.component.scss']
})
export class FlightResultsPageComponent implements OnInit {

  directFlights: FlightModel[] | null = []
  multihopFlights: FlightMultihopModel[] | null = []

  directReturnFlights: FlightModel[] | null = []
  multihopReturnFlights: FlightMultihopModel[] | null = []

  constructor(private flightService: FlightsService) {
    
  }

  ngOnInit(): void {
    this.flightService.directFlights.subscribe(flights => {
      this.directFlights = flights
    })
    this.flightService.multihopFlights.subscribe(flights => {
      this.multihopFlights = flights
    })
    this.flightService.directReturnFlights.subscribe(flights => {
      this.directReturnFlights = flights
    })
    this.flightService.multihopReturnFlights.subscribe(flights => {
      this.multihopReturnFlights = flights
    })
  }

}
