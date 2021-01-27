import { AirportType } from '../../models/types';
import { AirportSelectionService } from '../../services/airport-selection.service';
import { Airport } from '../../models/types';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.scss']
})
export class AirportTableComponent implements OnInit {

  columnHeaders = ['iataIdent', 'city', 'name'];
  @Input() airports: Airport[] = [];
  @Input() airportType = AirportType.ORIGIN;
  @Output() airportSelected = new EventEmitter<Airport>();

  constructor(private airportSelectionService: AirportSelectionService) { }

  ngOnInit(): void {
  }

  onRowClick(airport: Airport): void {
    this.airportSelectionService.emitAirportSelected(airport, this.airportType);
  }

}
