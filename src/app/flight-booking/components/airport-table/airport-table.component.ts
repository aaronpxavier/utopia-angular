import { Location } from '../../models/types';
import { EventService } from '../../services/event.service';
import { Airport } from '../../models/types';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.scss']
})
export class AirportTableComponent implements OnInit {

  allColumnHeaders = ['iataIdent', 'city', 'name'];
  columnHeaders = ['iataIdent', 'city', 'name'];
  @Input() airports: Airport[] = [];
  @Input() location = Location.ORIGIN;
  @Output() airportSelected = new EventEmitter<Airport>();

  constructor(
    private eventService: EventService,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit(): void {
    this.mediaObserver.asObservable().subscribe((mediaChanges: MediaChange[]) => {
      if (this.mediaObserver.isActive('lt-sm') && this.columnHeaders.length === this.allColumnHeaders.length) {
        this.columnHeaders = this.columnHeaders.slice(0, this.columnHeaders.length - 1);
      } else if (!this.mediaObserver.isActive('lt-sm')) {
        this.columnHeaders = this.allColumnHeaders;
      }
    });
  }

  onRowClick(airport: Airport): void {
    this.eventService.emitAirportSelected(airport, this.location);
  }

}
