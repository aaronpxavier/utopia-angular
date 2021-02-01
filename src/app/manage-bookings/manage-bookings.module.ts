import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { ManageBookingsRoutingModule } from './manage-bookings-routing.module';
import { ManageBookingsComponent } from './pages/manage-bookings/manage-bookings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { TravelerInfoComponent } from './components/traveler-info/traveler-info.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { ConfirmActionModalComponent } from './components/confirm-action-modal/confirm-action-modal.component';
import { EditTravelerModalComponent } from './components/edit-traveler-modal/edit-traveler-modal.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SortByPipe } from '../pipes/sort.pipe';
import { SharedComponentsModule } from '../components/shared-components.module';


@NgModule({
  declarations: [
    ManageBookingsComponent,
    BookingDetailsComponent,
    TravelerInfoComponent,
    PaymentInfoComponent,
    FlightInfoComponent,
    ConfirmActionModalComponent,
    EditTravelerModalComponent,
    SortByPipe
  ],
  imports: [
    CommonModule,
    ManageBookingsRoutingModule,
    MatTabsModule,
    MatListModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedComponentsModule
  ],
  providers: []
})
export class ManageBookingsModule { }
