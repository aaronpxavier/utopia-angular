import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightModel } from '../../models/flight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: FlightModel[]) {
   }

  ngOnInit(): void {
  }

  calculatePrice(): number {
    let sum = 0;
    for  (const flightLeg of this.data) {
      sum += flightLeg.price;
  }
    return sum;
  }
}
