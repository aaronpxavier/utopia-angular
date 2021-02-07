import { ResultsErrorMatcher } from './results-error-matcher';
import { Response } from './../../../shared/models/api-response-types';
import { AirportSelectionService } from '../../services/airport-selection.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirportSearchService } from '../../services/airport-search.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AirportModel } from 'src/app/shared/models/types';
import { iif, Observable } from 'rxjs';
import { AirportType } from '../../models/types';
@Component({
  selector: 'app-airport-search-modal',
  templateUrl: './airport-search-modal.component.html',
  styleUrls: ['./airport-search-modal.component.scss']
})
export class AirportSearchModalComponent implements OnInit {

  airports$: Observable<Response<AirportModel[]>>;
  airportType = AirportType.ORIGIN;
  searchForm = new FormControl('');
  error: string;
  errorMatcher = new ResultsErrorMatcher();

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

    this.airports$ = this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query: string) =>
          iif(() => query.length >= 3,
            this.airportSearchService.searchAirports(query)
          )
        ),
        tap(airports => {
          if (airports.data && airports.data.length === 0) {
            this.searchForm.setErrors({ message: 'No results were found.' });
          } else if (airports.error) {
            this.searchForm.setErrors({ message: airports.error });
          } else {
            this.searchForm.setErrors(null);
          }
        })
      );
  }
}
