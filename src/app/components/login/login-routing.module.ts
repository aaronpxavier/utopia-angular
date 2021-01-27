import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {FlightSearchPageComponent} from '../../flight-booking/pages/flight-search-page/flight-search-page.component';

const routes: Routes = [
  {
  path: '/booking/flight',
  pathMatch: 'full',
  component: FlightSearchPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoginroutingModule { }
