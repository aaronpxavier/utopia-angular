import { TravelerService } from './../../../services/traveler.service';
import { AirportService } from './../../../services/airport.service';
import { BookingModel, TravelerModel } from './../../models/booking-types';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/models/api-response-types';
import { AirportModel } from 'src/app/shared/models/types';
import { BookingService } from 'src/app/services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditTravelerModalComponent } from '../edit-traveler-modal/edit-traveler-modal.component';
import { ConfirmActionModalComponent } from '../confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
})
export class BookingDetailsComponent implements OnInit, OnChanges {

  @Input() booking: BookingModel;
  expandedIndex = 0;
  airports$: Observable<Response<AirportModel[]>>;

  constructor(
    private airportService: AirportService,
    private bookingService: BookingService,
    private travelerService: TravelerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  // TODO: cache loaded flights in session storage to prevent loading duplicate flights
  ngOnChanges(): void {
    this.fetchAirportList();
  }

  fetchAirportList(): void {
    this.airports$ = this.airportService.getAirportList(
      this.booking.flights
        .flatMap(flight => [
          flight.flightDetails.arriveCityId,
          flight.flightDetails.departCityId
        ])
    );
  }

  getAirport(airports: AirportModel[], id: string): AirportModel {
    return airports.find(airport => airport.iataIdent === id);
  }

  private showSnackbarOnHttpResponse = (successMessage: string, observable$: Observable<any>) => {
    const snackbarAction = 'Close';
    observable$.subscribe((response: Response<any>) => {
      if (response.data) {
        this.snackBar.open(successMessage, snackbarAction, { duration: 3000 });
      } else if (response.error) {
        this.snackBar.open(response.error, snackbarAction, { duration: 3000 });
      }
    });
  }

  onDeleteBooking(): void {
    const delete$ = this.bookingService.deleteBooking(this.booking.bookingId);
    this.showSnackbarOnHttpResponse('Booking deleted successfully', delete$);
    //   .subscribe((bookingDeleted: Response<boolean>) => {
    //   if (bookingDeleted.data) {
    //     this.snackBar.open('Booking deleted successfully.', 'Close', {
    //       duration: 3000
    //     });
    //   } else if (bookingDeleted.error) {
    //     this.snackBar.open(bookingDeleted.error, 'Close', {
    //       duration: 3000
    //     });
    //   }
    // });
  }

  onEditTraveler(traveler: TravelerModel): void {
    const editTravelerDialog = this.dialog.open(EditTravelerModalComponent, {
      width: '400px',
      data: {
        traveler: {...traveler},
        mode: 'edit',
        bookingId: this.booking.bookingId
      }
    });

    editTravelerDialog.afterClosed().subscribe((updatedTraveler: TravelerModel) => {
      if (updatedTraveler) {
        this.booking.travelers = this.booking.travelers.map(oldTraveler => {
          if (oldTraveler.travelerId === updatedTraveler.travelerId) {
            return updatedTraveler;
          }
          return oldTraveler;
        });
      }
    });
  }

  onAddTraveler(): void {
    const addTravelerDialog = this.dialog.open(EditTravelerModalComponent, {
      width: '400px',
      data: {
        traveler: { name: '', address: '', phone: '', email: '', dob: '' },
        mode: 'add',
        bookingId: this.booking.bookingId
      }
    });

    addTravelerDialog.afterClosed().subscribe(traveler => {
      if (traveler) {
        this.booking.travelers.push(traveler);
      }
    });
  }

  deleteTraveler(travelerId: number): void {
    this.travelerService.deleteTraveler(travelerId).subscribe((travelerDeleted: Response<boolean>) => {
      if (travelerDeleted.data) {
        this.snackBar.open('Traveler deleted successfully.', 'Close', {
          duration: 3000
        });
      } else if (travelerDeleted.error) {
        this.snackBar.open(travelerDeleted.error, 'Close', {
          duration: 3000
        });
      }
    });
  }

  onDeleteTraveler(travelerId: number): void {
    const travelerCost = this.booking.flights
      .map(flight => flight.price)
      .reduce((total, price) => total + price);

    const dialogRef = this.dialog.open(ConfirmActionModalComponent, {
      width: '400px',
      data: {
        title: 'Confirm Traveler Deletion',
        message: `Are you sure you want to permanently delete this traveler?
        Your card ending in 9999 will be refunded $${travelerCost}.`
      }
    });

    // TODO: prevent deletion of the last traveler (a booking cannot have 0 travelers)
    dialogRef.afterClosed().subscribe(shouldDeleteTraveler => {
      if (shouldDeleteTraveler) {
        this.deleteTraveler(travelerId);
      }
    });
  }
}
