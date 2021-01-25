import {Component, Input, OnInit} from '@angular/core';
import {Flight} from '../../models/flight';

@Component({
  selector: 'app-flight-result-item',
  templateUrl: './flight-result-item.component.html',
  styleUrls: ['./flight-result-item.component.scss']
})
export class FlightResultItemComponent implements OnInit {

  @Input() flight: Flight;
  @Input() isSelected = false;
  constructor() { }

  ngOnInit(): void {
  }




}
