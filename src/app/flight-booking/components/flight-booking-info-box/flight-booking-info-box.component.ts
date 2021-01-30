import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Flight} from '../../models/flight';
import {TripType} from '../../models/types';

@Component({
  selector: 'app-flight-booking-info-box',
  templateUrl: './flight-booking-info-box.component.html',
  styleUrls: ['./flight-booking-info-box.component.scss']
})
export class FlightBookingInfoBoxComponent implements OnInit {

  constructor() { }

  @Input() departingFlight: Flight;
  @Input() returnFlight: Flight;
  @Input() tripType: TripType;
  @Input() isReturn = false;
  @Input() showFltToggleBtn = false;
  @Output() fltToggleBtnClickEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() bookFlightButtonClick = new EventEmitter<void>();

  currentState = 'Select Departure';

  ngOnInit(): void {
  }

  disableButton(): boolean {
    if (this.tripType === TripType.ONE_WAY) {
      return false;
    }
    if (!this.departingFlight) {
      return true;
    }
    if (!this.returnFlight) {
      return true;
    }
    return false;
  }

  calculatePrice(): number {
    let sum = 0;
    if (this.departingFlight) {
      const departLegs = this.departingFlight.getLegs();
      sum += departLegs.length === 2 ? departLegs[1].price + departLegs[0].price : departLegs[0].price;
    }
    if (this.returnFlight) {
      const returnLegs = this.returnFlight.getLegs();
      sum += returnLegs.length === 2 ? returnLegs[1].price + returnLegs[0].price : returnLegs[0].price;
    }
    return sum;
  }

  bookFltBtnClick(): void {
    this.bookFlightButtonClick.emit();
  }

  setButtonText(): string {
    const prefixReturnText = this.returnFlight ? 'Change' : 'Add';
    return this.isReturn ? 'Change Departure Flight' : prefixReturnText + ' Return Flight';
  }

  depReturnToggleClicked(): void {
    this.fltToggleBtnClickEvent.emit();
  }

}
