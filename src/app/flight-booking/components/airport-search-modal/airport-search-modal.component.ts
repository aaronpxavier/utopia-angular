import { Response } from './../../../shared/models/api-response-types';
import { AirportSelectionService } from '../../services/airport-selection.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirportSearchService } from '../../services/airport-search.service';
import { retry } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AirportModel } from 'src/app/shared/models/types';
import { Observable } from 'rxjs';
import { AirportType } from '../../models/types';
@Component({
  selector: 'app-airport-search-modal',
  templateUrl: './airport-search-modal.component.html',
  styleUrls: ['./airport-search-modal.component.scss']
})
export class AirportSearchModalComponent implements OnInit {

  airports$: Observable<Response<AirportModel[]>>;
  airportType = AirportType.ORIGIN;

  loading = false;

  searchForm = new FormControl('');

  constructor(
    private dialogRef: MatDialogRef<AirportSearchModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { airport: AirportModel, airportType: AirportType },
    private airportSearchService: AirportSearchService,
    private airportSelectionService: AirportSelectionService
  ) {
      this.airportType = this.data.airportType;
    }

  ngOnInit(): void {
    this.airportSelectionService.observable().subscribe(event => {
      this.dialogRef.close();
    });
  }

  setSearchError(message: string): void {
    this.searchForm.setErrors({ message });
    this.searchForm.markAsTouched();
  }

  onEnterPress(): void {
    this.airports$ = this.airportSearchService.searchAirports(this.searchForm.value).pipe(retry(1));
  }
}
