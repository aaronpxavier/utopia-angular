import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Flight} from '../../models/flight';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';


@Component({
  selector: 'app-flight-result-item',
  templateUrl: './flight-result-item.component.html',
  styleUrls: ['./flight-result-item.component.scss']
})
export class FlightResultItemComponent implements OnInit {

  @Input() flight: Flight;
  @Input() isSelected = false;
  constructor(public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(FlightDetailsComponent, {
      data: {
        leg1: this.flight.getLegs()[0],
        leg2: this.flight.getNumLegs() === 2 && this.flight.getLegs()[1]
      }

    });
  }


}
