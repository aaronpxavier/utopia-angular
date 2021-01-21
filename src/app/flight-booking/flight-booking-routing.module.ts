import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {FlightSearchPageComponent} from './pages/flight-search-page/flight-search-page.component';
import {FlightResultsPageComponent} from './pages/flight-results-page/flight-results-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FlightSearchPageComponent
  },
  {
    path: 'results',
    pathMatch: 'full',
    component: FlightResultsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightBookingRoutingModule{}
