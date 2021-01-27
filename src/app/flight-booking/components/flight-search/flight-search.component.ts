import {FlightRequest, FlightsService} from '../../services/flights.service';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog,} from '@angular/material/dialog';
import {ToolbarService} from 'src/app/shared/services/toolbar.service';
import {AirportSearchModalComponent} from '../airport-search-modal/airport-search-modal.component';
import {EventService} from '../../services/event.service';
import {Airport, Location, TripType} from '../../models/types';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  @Input() location = Location.ORIGIN;

  tripTypes = [TripType.ROUND_TRIP, TripType.ONE_WAY];
  TripType = TripType; // expose enum in template
  today = new Date();
  passengers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  originAirport: Airport = { iataIdent: 'LAX', city: 'Los Angeles, CA', name: 'Los Angeles International' };
  destinationAirport: Airport = { iataIdent: 'JFK', city: 'New York, NY', name: 'John F. Kennedy International' };
  selectedPassengers = 1;
  selectedTripType = TripType.ROUND_TRIP;
  dateForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private toolbarService: ToolbarService,
    private fb: FormBuilder,
    private flightService: FlightsService
  ) {
    this.dateForm = this.fb.group({
      departDate: [null, [Validators.required]],
      returnDate: [null, [this.requireReturnDateForRoundTripValidator]]
    });
  }

  ngOnInit(): void {
    this.toolbarService.emitRouteChangeEvent('Flight Search');
    this.eventService.airportSelectedListener().subscribe(data => {
      if (data.location === 'Origin') {
        this.originAirport = data.airport;
      } else if (data.location === 'Destination') {
        this.destinationAirport = data.airport;
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
    return this.dateForm.get('departDate');
  }

  get returnDate(): AbstractControl {
    return this.dateForm.get('returnDate');
  }

  openOriginModal(): void {
    this.openModal(Location.ORIGIN);
  }

  openDestinationModal(): void {
    this.openModal(Location.DESTINATION);
  }

  openModal(location: Location): void {
    this.dialog.open(AirportSearchModalComponent, {
      width: 'calc(100vw * 0.75)',
      height: 'calc(100vh * 0.75)',
      data: {
        airport: location === Location.ORIGIN ? this.originAirport : this.destinationAirport,
        location
      }
    });
  }

  onTripChange(): void {
    this.returnDate?.updateValueAndValidity();
  }

  onFlightSearch(): void {
    const dates = this.dateForm.getRawValue();

    const flightRequest: FlightRequest = {
      originAirport: this.originAirport,
      destinationAirport: this.destinationAirport,
      passengers: this.selectedPassengers,
      tripType: this.selectedTripType,
      departDate: dates.departDate,
      returnDate: dates.returnDate
    };

    this.flightService.setFlightRequest(flightRequest);

    if (flightRequest.tripType === TripType.ROUND_TRIP) {
      this.flightService.setIsRoundTrip(true);
    } else if (flightRequest.tripType === TripType.ONE_WAY) {
      this.flightService.setIsRoundTrip(false);
    }
  }
}
