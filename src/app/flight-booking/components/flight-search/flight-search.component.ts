import {FlightRequest, FlightsService} from '../../services/flights.service';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToolbarService} from 'src/app/shared/services/toolbar.service';
import {AirportSearchModalComponent} from '../airport-search-modal/airport-search-modal.component';
import {AirportSelectionService} from '../../services/airport-selection.service';
import {AirportType, TripType} from '../../models/types';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AirportModel } from 'src/app/shared/models/types';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  @Input() airportType = AirportType.ORIGIN;

  tripTypes = [TripType.ROUND_TRIP, TripType.ONE_WAY];
  TripType = TripType; // expose enum in template
  today = new Date();
  passengers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  defaultOriginAirport: AirportModel = { iataIdent: 'From', city: 'Origin', name: '' };
  defaultDestinationAirport: AirportModel = { iataIdent: 'To', city: 'Destination', name: '' };

  selectedPassengers = 1;
  selectedTripType = TripType.ROUND_TRIP;
  form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private airportSelectionService: AirportSelectionService,
    private toolbarService: ToolbarService,
    private fb: FormBuilder,
    private flightService: FlightsService
  ) {
    this.form = this.fb.group({
      originAirport: [null, [Validators.required]],
      destinationAirport: [null, [Validators.required]],
      departDate: [null, [Validators.required]],
      returnDate: [null, [this.requireReturnDateForRoundTripValidator]]
    });
  }

  ngOnInit(): void {
    this.toolbarService.emitRouteChangeEvent('Flight Search');
    this.airportSelectionService.observable().subscribe(data => {
      if (data.airportType === 'Origin') {
        this.originAirport.setValue(data.airport);
      } else if (data.airportType === 'Destination') {
        this.destinationAirport.setValue(data.airport);
      }
    });
  }

  // must be an arrow function to bind to `this`
  requireReturnDateForRoundTripValidator = (formControl: AbstractControl) => {
    if (this.selectedTripType === TripType.ROUND_TRIP) {
      return Validators.required(formControl);
    } else {
      return null;
    }
  }

  get departDate(): AbstractControl {
    return this.form.get('departDate');
  }

  get returnDate(): AbstractControl {
    return this.form.get('returnDate');
  }

  get originAirport(): AbstractControl {
    return this.form.get('originAirport');
  }

  get destinationAirport(): AbstractControl {
    return this.form.get('destinationAirport');
  }

  openOriginModal(): void {
    this.openModal(AirportType.ORIGIN);
  }

  openDestinationModal(): void {
    this.openModal(AirportType.DESTINATION);
  }

  openModal(airportType: AirportType): void {
    this.dialog.open(AirportSearchModalComponent, {
      width: 'calc(100vw * 0.75)',
      maxWidth: '100vw',
      height: 'calc(100vh * 0.75)',
      data: {
        airport: airportType === AirportType.ORIGIN ? this.originAirport : this.destinationAirport,
        airportType
      }
    });
  }

  onTripChange(): void {
    this.returnDate?.updateValueAndValidity();
  }

  onFlightSearch(): void {
    const formValues = this.form.getRawValue();

    const flightRequest: FlightRequest = {
      originAirport: formValues.originAirport,
      destinationAirport: formValues.destinationAirport,
      passengers: this.selectedPassengers,
      tripType: this.selectedTripType,
      departDate: formValues.departDate,
      returnDate: formValues.returnDate
    };

    this.flightService.setFlightRequest(flightRequest);

    if (flightRequest.tripType === TripType.ROUND_TRIP) {
      this.flightService.setIsRoundTrip(true);
    } else if (flightRequest.tripType === TripType.ONE_WAY) {
      this.flightService.setIsRoundTrip(false);
    }
  }
}
