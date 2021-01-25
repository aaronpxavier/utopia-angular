import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatPaginator} from '@angular/material/paginator';
import {MatSelectChange} from '@angular/material/select';

export interface FlightResultsCheckboxEvent {
  matCheckboxEvent: MatCheckboxChange;
}

export interface FlightResultsSelectEvent {
  matSelectChange: MatSelectChange;
}
