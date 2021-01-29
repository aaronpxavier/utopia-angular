import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Flight } from 'src/app/flight-booking/models/flight';
import { Flight } from '../../models/flight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Flight) {
   }

  ngOnInit(): void {
  }

}
