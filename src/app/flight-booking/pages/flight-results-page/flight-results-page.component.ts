import {Component, OnInit} from '@angular/core';
import {FlightRequest, FlightsService} from 'src/app/flight-booking/services/flights.service';
import {Flight} from '../../models/flight';
import {TripType} from '../../models/types';
import {FlightResultItemComponent} from '../../components/flight-result-item/flight-result-item.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {durationComparator, priceComparator, stopsComparator} from '../../models/flt-results-sort-comparators';
import {FLT_RESULTS_REQ_KEY, SHOW_RETURN_FLTS} from '../../constants/session-keys';
import {ToolbarService} from '../../../shared/services/toolbar.service';
import {FlightResultsCheckboxEvent, FlightResultsSelectEvent} from '../../models/flight-results-checkbox-event';

@Component({
  templateUrl: './flight-results-page.component.html',
  styleUrls: ['./flight-results-page.component.scss']
})

export class FlightResultsPageComponent implements OnInit {
  departureFlights: Flight[];
  returnFlights: Flight[];
  flightsToShow = new Array<Flight>();
  showReturnFlights = false;
  totalResults = 0;
  defaultMaxPageResults = 10;
  currentStartIndex = 0;
  isPending = true;
  currentEndIndex = this.defaultMaxPageResults;
  selectedDepartureFlight: Flight | undefined;
  selectedReturnFlight: Flight | undefined;
  tripType: TripType;
  constructor(
    public flightService: FlightsService,
    private toolbarService: ToolbarService) {
  }

  ngOnInit(): void {
    this.toolbarService.emitRouteChangeEvent('Select Flights');
    if (!this.flightService.flightRequest) {
      this.loadFlightsData();
    } else {
      this.tripType = this.flightService.flightRequest.tripType;
      this.flightService.getDepFlights();
      this.resetFlightsArray();
      this.persistFltsData();
    }
    this.flightService.departureFlights.subscribe(flights => {
      if (flights) {
        this.processFlightsStream(flights, true);
      }
    });
    if (this.flightService.isRoundTrip) {
      this.flightService.returnFlights.subscribe(flights => {
        if (flights) {
          this.processFlightsStream(flights, false);
        }
      });
    }
    // @ts-ignore
    window.onhashchange(this.resetFlightsArray());
  }

  private resetFlightsArray(): void {
    this.departureFlights = new Array<Flight>();
    this.returnFlights = new Array<Flight>();
  }

  private processFlightsStream(flights: Flight[], isDeparture: boolean): void {
    const tempFlights = isDeparture ? this.departureFlights : this.returnFlights;
    flights.forEach(flight => tempFlights.push(flight));
    this.totalResults = tempFlights.length;
    this.loadFltsToShow(0, this.defaultMaxPageResults);
    this.isPending = false;
  }

  private persistFltsData(): void {
    sessionStorage.setItem(FLT_RESULTS_REQ_KEY, JSON.stringify(this.flightService.flightRequest));
    sessionStorage.setItem(SHOW_RETURN_FLTS, this.showReturnFlights ? '1' : '0');
  }

  private loadFlightsData(): void {
    const flightRequest: FlightRequest = JSON.parse(sessionStorage.getItem(FLT_RESULTS_REQ_KEY));
    const showReturnFlights = sessionStorage.getItem(SHOW_RETURN_FLTS);
    if (!flightRequest) {
      throw new Error('No flight request in session storage');
    }
    flightRequest.departDate = new Date(flightRequest.departDate);
    flightRequest.returnDate = new Date(flightRequest.returnDate);
    this.showReturnFlights = showReturnFlights && showReturnFlights === '1' ? true : false;
    this.flightService.setFlightRequest(flightRequest);
    this.flightService.getDepFlights();
    if (flightRequest.tripType === TripType.ROUND_TRIP) {
      this.flightService.setIsRoundTrip(true);
    }
  }

  selectFlight(flight: Flight, flightResultItemComponent: FlightResultItemComponent): void {
    flightResultItemComponent.isSelected = true;
    if (this.showReturnFlights) {
      this.selectedReturnFlight = flight;
    } else {
      this.selectedDepartureFlight = flight;
    }
  }

  loadFltsToShow(startIndex: number, endIndex: number): void {
    this.flightsToShow = new Array<Flight>();
    const flights = this.showReturnFlights ? this.returnFlights : this.departureFlights;
    for (let i = startIndex; i < endIndex && i < flights.length; i++) {
      this.flightsToShow.push(flights[i]);
    }
  }

  paginatorTrigger(pageEvent: PageEvent): void {
    this.currentStartIndex = pageEvent.pageIndex * pageEvent.pageSize;
    this.currentEndIndex = this.currentStartIndex + pageEvent.pageSize;
    this.loadFltsToShow(this.currentStartIndex, this.currentEndIndex);
    console.log(pageEvent);
  }

  nonStopFilterTrigger(event: FlightResultsCheckboxEvent, paginator: MatPaginator): void {
    console.log(event);
    const tempFlights = this.showReturnFlights ? this.returnFlights : this.departureFlights;
    if (event.matCheckboxEvent.checked) {
      const filteredFlights = tempFlights.filter((flight: Flight) => flight.getNumLegs() === 1);
      console.log(filteredFlights);
      if (this.showReturnFlights) {
        this.returnFlights = filteredFlights;
      } else {
        this.departureFlights = filteredFlights;
      }
      this.totalResults = filteredFlights.length;
    } else {
      this.isPending = true;
      if (this.showReturnFlights) {
        this.returnFlights = new Array<Flight>();
        this.flightService.getReturnFlts();
      } else {
        this.departureFlights = new Array<Flight>();
        this.flightService.getDepFlights();
      }
    }
    this.loadFltsToShow(0, this.defaultMaxPageResults);
    paginator.pageIndex = 0;
  }

  sortParamSelected(event: FlightResultsSelectEvent): void {
    const flights = this.showReturnFlights ? this.returnFlights : this.departureFlights;
    switch (parseInt(event.matSelectChange.value, 10)) {
      case 1:
        flights.sort(durationComparator);
        break;
      case 2:
        flights.sort(priceComparator);
        break;
      case 3:
        flights.sort(stopsComparator);
    }
    this.loadFltsToShow(this.currentStartIndex, this.currentEndIndex);
    console.log(event);
  }

  departReturnToggle(): void {
    this.showReturnFlights = !this.showReturnFlights;
    if (this.returnFlights.length === 0) {
      this.isPending = true;
      this.flightService.getReturnFlts();
    }
    this.loadFltsToShow(0, this.defaultMaxPageResults);
    sessionStorage.setItem(SHOW_RETURN_FLTS, this.showReturnFlights ? '1' : '0');
  }

  resultItemIsSelected(resultComponent: FlightResultItemComponent): boolean {
    const selected = this.showReturnFlights ? this.selectedReturnFlight : this.selectedDepartureFlight;
    if (selected) {
      return selected === resultComponent.flight ? true : false;
    }
    return false;
  }

}
