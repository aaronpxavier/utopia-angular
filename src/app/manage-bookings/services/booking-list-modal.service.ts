import { EventEmitter, Injectable } from '@angular/core';
import { BookingModel } from 'src/app/shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class BookingListModalService {

  bookingSelected = new EventEmitter<BookingModel>();
  isHistory = new EventEmitter<boolean>();

  constructor() { }

  select(booking: BookingModel): void {
    this.bookingSelected.emit(booking);
  }

  changeTab(isHistory: boolean): void {
    this.isHistory.emit(isHistory);
  }

}
