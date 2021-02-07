import { AirportType } from '../../models/types';
import { AirportSelectionService } from '../../services/airport-selection.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { AirportModel } from 'src/app/shared/models/types';

@Component({
  selector: 'app-airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.scss']
})
export class AirportTableComponent implements OnInit {

  allColumnHeaders = ['iataIdent', 'city', 'name'];
  columnHeaders = ['iataIdent', 'city', 'name'];
  @Input() airports: AirportModel[] = [];
  @Input() airportType = AirportType.ORIGIN;
  @Output() airportSelected = new EventEmitter<AirportModel>();

  constructor(
    private airportSelectionService: AirportSelectionService,
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

  onRowClick(airport: AirportModel): void {
    this.airportSelectionService.emitAirportSelected(airport, this.airportType);
  }

}
