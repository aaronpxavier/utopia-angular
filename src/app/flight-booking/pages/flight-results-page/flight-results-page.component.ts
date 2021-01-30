import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FlightRequest, FlightsService} from 'src/app/flight-booking/services/flights.service';
import {Flight} from '../../models/flight';
import {TripType} from '../../models/types';
import {FlightResultItemComponent} from '../../components/flight-result-item/flight-result-item.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {durationComparator, priceComparator, stopsComparator} from '../../models/flt-results-sort-comparators';
import {FLT_RESULTS_REQ_KEY, SHOW_RETURN_FLTS, SELECTED_DEP_FLT, SELECTED_RETURN_FLT} from '../../constants/session-keys';
import {ToolbarService} from '../../../shared/services/toolbar.service';
import {FlightResultsCheckboxEvent, FlightResultsSelectEvent} from '../../models/flight-results-checkbox-event';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  templateUrl: './flight-results-page.component.html',
  animations: [
    trigger('startStop', [
      state('start', style({
        position: 'relative',
      })),
      state('stop', style({
        position: 'fixed',
        top: '10px',
        left: '10px',
      })),
      transition('start => stop', [
        animate('.5s', keyframes([
          style({
            position: 'fixed',
            top: '10px',
            left: '-400px'
          }),
          style({
            position: 'fixed',
            top: '10px',
            left: '10px'
          })
        ]))
      ]),
      transition('stop => start', [
        animate('.5s', keyframes([
          style({
            position: 'fixed',
            top: '10px',
            left: '10px'
          }),
          style({
            position: 'fixed',
            top: '10px',
            left: '-400px'
          }),
        ]))
      ]),
    ])
    ],
  styleUrls: ['./flight-results-page.component.scss']
})

export class FlightResultsPageComponent implements OnInit, OnDestroy {
  departureFlights: Flight[];
  returnFlights: Flight[];
  flightsToShow = new Array<Flight>();
  showReturnFlights = false;
  startAnimation = true;
  totalResults = 0;
  public showShoppingFab = false;
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
      this.loadCartData();
    } else {
      this.tripType = this.flightService.flightRequest.tripType;
      this.flightService.getDepFlights();
      this.resetFlightsArray();
      this.persistTableData();
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
    window.onhashchange = this.resetFlightsArray();
    window.addEventListener('scroll', this.scrollEvent, true);
    window.addEventListener('resize', this.scrollEvent, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollEvent, true);
    window.removeEventListener('resize', this.scrollEvent, true);
  }

  @HostListener('window:scroll')
  public scrollEvent(): void {
    this.showShoppingFab = true;
    console.log(window.scrollY);
    if (window.scrollY > 380 && window.innerWidth < 1025) {
      this.showShoppingFab = true;
    } else if (!this.startAnimation && window.innerWidth < 1025 && window.scrollY > 100) {
      this.showShoppingFab = true;
    } else {
      this.showShoppingFab = false;
    }
  }

  @HostListener('window:resize')
  private resizeEvent(): void {
    console.log(window.innerWidth);
    if (this.showShoppingFab && window.innerWidth > 1025) {
      this.showShoppingFab = false;
    }
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

  private persistTableData(): void {
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

  private loadCartData(): void {
    this.selectedDepartureFlight = new Flight();
    this.selectedReturnFlight = new Flight();
    this.selectedDepartureFlight.deserialize(sessionStorage.getItem(SELECTED_DEP_FLT));
    this.selectedReturnFlight.deserialize(sessionStorage.getItem(SELECTED_RETURN_FLT));
  }

  selectFlight(flight: Flight, flightResultItemComponent: FlightResultItemComponent): void {
    flightResultItemComponent.isSelected = true;
    if (this.showReturnFlights) {
      this.selectedReturnFlight = flight;
      sessionStorage.setItem(SELECTED_RETURN_FLT, JSON.stringify(flight));
    } else {
      this.selectedDepartureFlight = flight;
      sessionStorage.setItem(SELECTED_DEP_FLT, JSON.stringify(flight));
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

    return selected && selected === resultComponent.flight;

    return false;
  }

  animationToggle(): void {
    this.startAnimation = !this.startAnimation;
  }

}
