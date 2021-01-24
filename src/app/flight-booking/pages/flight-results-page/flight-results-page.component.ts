import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { FlightsService } from 'src/app/flight-booking/services/flights.service';
import {Flight} from '../../models/flight';
import {TripType} from '../../models/types';
import {FlightResultItemComponent} from '../../components/flight-result-item/flight-result-item.component';
import {PageEvent} from '@angular/material/paginator';
import {MatSelectChange} from '@angular/material/select';
import { durationComparator, priceComparator, stopsComparator } from '../../models/flt-results-sort-comparators';

@Component({
  templateUrl: './flight-results-page.component.html',
  styleUrls: ['./flight-results-page.component.scss']
})
export class FlightResultsPageComponent implements OnInit {

  departureFlights = new Array<Flight>();
  returnFlights = new Array<Flight>();
  flightsToShow = new Array<Flight>();
  defaultMaxPageResults = 10;
  currentStartIndex = 0;
  currentEndIndex = this.defaultMaxPageResults;
  selectedResultItem: FlightResultItemComponent | undefined;
  tripType: TripType;
  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    this.tripType = this.flightService.flightRequest.tripType;
    this.flightService.departureFlights.subscribe(flights => {
      if (flights) {
        flights.forEach(flt => this.departureFlights.push(flt));
        this.loadFltsToShow(this.currentStartIndex, this.defaultMaxPageResults);
      }
    });
    this.flightService.returnFlights.subscribe(flights => {
      if (flights) {
        flights.forEach(flt => this.returnFlights.push(flt));
      }
    });
  }

  selectFlight(flights: Flight, flightResult: FlightResultItemComponent): void {
    if (this.selectedResultItem) {
      this.selectedResultItem.isSelected = false;
    }
    flightResult.isSelected = true;
    this.selectedResultItem = flightResult;
    console.log(flights.getLegs()[0].flightNumber);
  }

  loadFltsToShow(startIndex: number, endIndex: number): void {
    this.flightsToShow = new Array<Flight>();
    for (let i = startIndex; i < endIndex && i < this.departureFlights.length - 1; i++) {
      this.flightsToShow.push(this.departureFlights[i]);
    }
  }

  paginatorTrigger(pageEvent: PageEvent): void {
    this.currentStartIndex = pageEvent.pageIndex * pageEvent.pageSize;
    this.currentEndIndex = this.currentStartIndex + pageEvent.pageSize;
    this.loadFltsToShow(this.currentStartIndex, this.currentEndIndex);
    console.log(pageEvent);
  }

  sortParamSelected(event: MatSelectChange): void {
    switch (parseInt(event.value, 10)) {
      case 1:
        this.departureFlights.sort(durationComparator);
        break;
      case 2:
        this.departureFlights.sort(priceComparator);
        break;
      case 3:
        this.departureFlights.sort(stopsComparator);
    }
    this.loadFltsToShow(this.currentStartIndex, this.currentEndIndex);
    console.log(event);
  }

}
