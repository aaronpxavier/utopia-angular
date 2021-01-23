import {Component, Input, OnInit} from '@angular/core';
import {Flight} from '../../models/flight';

@Component({
  selector: 'app-flight-result-item',
  templateUrl: './flight-result-item.component.html',
  styleUrls: ['./flight-result-item.component.scss']
})
export class FlightResultItemComponent implements OnInit {

  @Input() flight: Flight;
  constructor() { }

  ngOnInit(): void {
  }


  calculateTimeBetween(): string {
    const legs = this.flight.getLegs();
    const departureTime = legs[0].departTime;
    const arrivalTime = legs.length === 2 ? legs[1].arrivalTime : legs.length === 1 ? legs[0].arrivalTime : undefined;
    if (arrivalTime === undefined) {
      return 'und';
    }
    const hoursMins = Math.abs(((departureTime.getTime() - arrivalTime.getTime()) / 3600) % 24);
    const hours = Math.floor(hoursMins);
    const min = Math.floor(hoursMins % 1 * 60);
    return hours.toString() + 'h ' +  (min ? min + 'm' : '');
  }

}
