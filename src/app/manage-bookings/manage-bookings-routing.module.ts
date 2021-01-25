import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageBookingsComponent } from './pages/manage-bookings/manage-bookings.component';

const routes: Routes = [{ path: '', component: ManageBookingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBookingsRoutingModule { }
