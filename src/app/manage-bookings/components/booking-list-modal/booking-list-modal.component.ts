import { BookingListModalService } from './../../services/booking-list-modal.service';
import { Component, OnInit } from '@angular/core';
import { BookingModel } from 'src/app/shared/models/types';

@Component({
  selector: 'app-booking-list-modal',
  templateUrl: './booking-list-modal.component.html',
  styleUrls: ['./booking-list-modal.component.scss']
})
export class BookingListModalComponent implements OnInit {

  isHistory: boolean;
  booking: BookingModel;

  constructor(
    private bookingListModalService: BookingListModalService
  ) { }

  ngOnInit(): void {
  }

  onBookingChange(booking: BookingModel): void {
    this.bookingListModalService.select(booking);
  }

  onTabChange(isHistory: boolean): void {
    this.isHistory = isHistory;
  }

}
