import { EventService } from './../services/event.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirportSearchService } from '../services/airport-search.service';
import {Airport, Location} from './../shared/types';

@Component({
  selector: 'app-airport-search-modal',
  templateUrl: './airport-search-modal.component.html',
  styleUrls: ['./airport-search-modal.component.scss']
})
export class AirportSearchModalComponent implements OnInit {

  airportQuery = '';

  airports: Airport[] = [];

  location = Location.ORIGIN;

  constructor(private dialogRef: MatDialogRef<AirportSearchModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { airport: Airport, location: Location },
              private service: AirportSearchService, private eventService: EventService) {
      this.airportQuery = data.airport.iataIdent;
      this.location = data.location;
    }

  ngOnInit(): void {
    this.eventService.airportSelectedListener().subscribe(event => {
      this.dialogRef.close();
    });
  }

  onEnterPress(): void {
    this.service.searchAirports(this.airportQuery)
      .subscribe(airports => {
        this.airports = airports;
      });
  }
}
