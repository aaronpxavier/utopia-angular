import { EventService } from '../../services/event.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirportSearchService } from '../../services/airport-search.service';
import { Airport, Location } from '../../models/types';
import { retry } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-airport-search-modal',
  templateUrl: './airport-search-modal.component.html',
  styleUrls: ['./airport-search-modal.component.scss']
})
export class AirportSearchModalComponent implements OnInit {

  airports: Airport[] = [];
  location = Location.ORIGIN;

  loading = false;

  searchForm = new FormControl('');

  constructor(private dialogRef: MatDialogRef<AirportSearchModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { airport: Airport, location: Location },
              private service: AirportSearchService, private eventService: EventService) {
      this.location = this.data.location;
    }

  ngOnInit(): void {
    this.eventService.airportSelectedListener().subscribe(event => {
      this.dialogRef.close();
    });
  }

  setSearchError(message: string): void {
    this.searchForm.setErrors({ message });
    this.searchForm.markAsTouched();
  }

  onEnterPress(): void {
    this.loading = true;
    this.airports = [];
    this.service.searchAirports(this.searchForm.value).pipe(retry(1))
      .subscribe(airports => {
          this.airports = airports;
          if (airports.length === 0) {
            this.setSearchError('No results found.');
          } else {
            this.searchForm.setErrors(null);
          }
          this.loading = false;
      }, error => {
        this.loading = false;
        this.setSearchError('Cannot connect to server. Please try again later.');
      });
  }
}
