import { BookingListComponent } from './components/booking-list/booking-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBookingsRoutingModule } from './manage-bookings-routing.module';
import { ManageBookingsComponent } from './pages/manage-bookings/manage-bookings.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { TravelerInfoComponent } from './components/traveler-info/traveler-info.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { ConfirmActionModalComponent } from './components/confirm-action-modal/confirm-action-modal.component';
import { EditTravelerModalComponent } from './components/edit-traveler-modal/edit-traveler-modal.component';
import { BookingListModalComponent } from './components/booking-list-modal/booking-list-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ManageBookingsComponent,
    BookingDetailsComponent,
    TravelerInfoComponent,
    PaymentInfoComponent,
    FlightInfoComponent,
    ConfirmActionModalComponent,
    EditTravelerModalComponent,
    BookingListComponent,
    BookingListModalComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ManageBookingsRoutingModule
  ],
  providers: []
})
export class ManageBookingsModule { }
