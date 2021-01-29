import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirportModel } from 'src/app/shared/models/types';
import { Flight, FlightModel } from '../../models/flight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  @Input() departAirport: AirportModel;
  @Input() arriveAirport: AirportModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FlightModel[]) {
   }

  ngOnInit(): void {
  }
}
