import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {FlightResultsCheckboxEvent, FlightResultsSelectEvent} from '../../models/flight-results-checkbox-event';
import {Flight} from '../../models/flight';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-flight-results-options',
  templateUrl: './flight-results-options.component.html',
  styleUrls: ['./flight-results-options.component.scss']
})
export class FlightResultsOptionsComponent implements OnInit {

  constructor() { }

  @Output() flightResultsNonStopChange: EventEmitter<FlightResultsCheckboxEvent> = new EventEmitter<FlightResultsCheckboxEvent>();
  @Output() flightResultsSelectChange: EventEmitter<FlightResultsSelectEvent> = new EventEmitter<FlightResultsSelectEvent>();
  @Output() buttonClickEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() showButton = false;
  @Input() isReturn = false;


  ngOnInit(): void {
  }

  nonStopFilterTrigger(event: MatCheckboxChange): void {
    this.flightResultsNonStopChange.emit({matCheckboxEvent: event});
  }

  sortParamSelected(event: MatSelectChange): void {
    this.flightResultsSelectChange.emit({matSelectChange: event});
  }

  depReturnToggleClicked(): void {
    this.buttonClickEvent.emit();
  }

  setButtonText(): string {
      return this.isReturn ? 'Select Departure Flight' : 'Select Return Flight';
  }

}
