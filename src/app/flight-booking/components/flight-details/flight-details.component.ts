import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Flight } from 'src/app/flight-booking/models/flight';
import { Flight } from '../../models/flight';
import { AirportModel } from './types';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  @Input() flight: Flight;
  @Input() departAirport: AirportModel;
  @Input() arriveAirport: AirportModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Flight) {
   }

  ngOnInit(): void {
  }

}
