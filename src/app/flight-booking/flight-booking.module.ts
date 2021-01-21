import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportSearchModalComponent } from './components/airport-search-modal/airport-search-modal.component';
import { AirportTableComponent } from './components/airport-table/airport-table.component';
import { FlightResultItemComponent } from './components/flight-result-item/flight-result-item.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightResultsPageComponent } from './pages/flight-results-page/flight-results-page.component';
import { FlightSearchPageComponent } from './pages/flight-search-page/flight-search-page.component';
import { SharedModule } from '../shared/shared.module';
import { AirportSearchService } from './services/airport-search.service';
import { EventService } from './services/event.service';
import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightsService } from './services/flights.service';

@NgModule({
  declarations: [
    AirportSearchModalComponent,
    AirportTableComponent,
    FlightResultItemComponent,
    FlightSearchComponent,
    FlightResultsPageComponent,
    FlightSearchPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlightBookingRoutingModule
  ],
  providers: [
    AirportSearchService,
    EventService,
    FlightsService
  ]
})
export class FlightBookingModule { }
