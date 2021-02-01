import { EditTravelerModalData } from './../edit-traveler-modal/edit-traveler-modal.component';
import { AirportService } from '../../../services/airport/airport.service';
import { TravelerService } from '../../../services/traveler/traveler.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/models/api-response-types';
import { AirportModel, BookingModel, TravelerModel } from 'src/app/shared/models/types';
import { MatDialog } from '@angular/material/dialog';
import { EditTravelerModalComponent } from '../edit-traveler-modal/edit-traveler-modal.component';
import { ActionModalData, ConfirmActionModalComponent } from '../confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
})
export class BookingDetailsComponent implements OnInit, OnChanges {

  @Input() booking: BookingModel;
  @Input() isHistory: boolean;
  expandedIndex = 0;
  airports$: Observable<Response<AirportModel[]>>;

  constructor(
    private airportService: AirportService,
    private travelerService: TravelerService,
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

  onEditTraveler(traveler: TravelerModel): void {
    const editTravelerDialog = this.dialog.open(EditTravelerModalComponent, {
      width: '400px',
      data: {
        traveler: { ...traveler },
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
    const modalData: EditTravelerModalData = {
      traveler: { name: '', address: '', phone: '', email: '', dob: null },
      mode: 'add',
      bookingId: this.booking.bookingId
    };

    const addTravelerDialog = this.dialog.open(EditTravelerModalComponent, {
      width: '400px',
      data: modalData
    });

    addTravelerDialog.afterClosed().subscribe(traveler => {
      if (traveler) {
        this.booking.travelers.push(traveler);
      }
    });
  }

  onDeleteTraveler(travelerId: number): void {
    const travelerCost = this.booking.flights
      .map(flight => flight.price)
      .reduce((total, price) => total + price);

    const modalData: ActionModalData = {
      title: 'Confirm Traveler Deletion',
      content: `Are you sure you want to permanently delete this traveler?
        Your card ending in 9999 will be refunded $${travelerCost}.`,
      action$: this.travelerService.deleteTraveler(travelerId),
      successMessage: 'Traveler deleted successfully.',
      failureMessage: 'Failed to delete traveler. Please try again.'
    };
    const dialogRef = this.dialog.open(ConfirmActionModalComponent, {
      width: '400px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(updatedTraveler => {
      if (updatedTraveler) {
        this.booking.travelers = this.booking.travelers
          .filter(traveler => traveler.travelerId !== travelerId);
      }
    });
  }
}
