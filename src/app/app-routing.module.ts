import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ToolbarComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'booking/flight',
        pathMatch: 'full'
      },
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
        path: 'booking/flight',
        loadChildren: () => import ('./flight-booking/flight-booking.module').then(m => m.FlightBookingModule)
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'manage-bookings',
        pathMatch: 'full',
        loadChildren: () => import ('./manage-bookings/manage-bookings.module').then(m => m.ManageBookingsModule)
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
