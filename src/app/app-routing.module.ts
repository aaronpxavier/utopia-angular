import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightResultsPageComponent } from './components/flight-results-page/flight-results-page.component';
import { FlightSearchPageComponent } from './components/flight-search-page/flight-search-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: ToolbarComponent,
    children: [
      {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full'
      },
      {
        path: 'signup/:token',
        component: SignupComponent,
        pathMatch: 'full'
      },
      {
        path: 'flightSearch',
        component: FlightSearchPageComponent
      },
      {
        path: 'flightResults',
        component: FlightResultsPageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
