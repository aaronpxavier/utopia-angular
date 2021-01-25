import { Component, Input, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/flight-booking/models/flight';
import { AirportModel } from 'src/app/shared/models/types';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss']
})
export class FlightInfoComponent implements OnInit {

  @Input() flight: FlightModel;
  @Input() departAirport: AirportModel;
  @Input() arriveAirport: AirportModel;

  constructor() { }

  ngOnInit(): void {
  }
}
