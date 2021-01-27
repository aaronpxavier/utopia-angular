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
import { FlightBookingInfoBoxComponent } from './components/flight-booking-info-box/flight-booking-info-box.component';
import { FlightResultsOptionsComponent } from './components/flight-results-options/flight-results-options.component';
import { FlightBookingInfoBoxDetailsComponent } from './components/flight-booking-info-box-details/flight-booking-info-box-details.component';

@NgModule({
  declarations: [
    AirportSearchModalComponent,
    AirportTableComponent,
    FlightResultItemComponent,
    FlightSearchComponent,
    FlightResultsPageComponent,
    FlightSearchPageComponent,
    FlightBookingInfoBoxComponent,
    FlightResultsOptionsComponent,
    FlightBookingInfoBoxDetailsComponent
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
