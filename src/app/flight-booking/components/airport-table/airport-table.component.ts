import { Location } from '../../models/types';
import { EventService } from '../../services/event.service';
import { Airport } from '../../models/types';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.scss']
})
export class AirportTableComponent implements OnInit {

  columnHeaders = ['iataIdent', 'city', 'name'];
  @Input() airports: Airport[] = [];
  @Input() location = Location.ORIGIN;
  @Output() airportSelected = new EventEmitter<Airport>();

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  onRowClick(airport: Airport) {
    this.eventService.emitAirportSelected(airport, this.location);
  }

}
