import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
      },
      {
        path: 'flightSearch',
        component: FlightSearchPageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
