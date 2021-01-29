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
    const dataArray = [];
    for (let i = 0; i < this.flight.getNumLegs(); i++) {
      dataArray.push(this.flight.getLegs()[i]);
    }
    this.dialog.open(FlightDetailsComponent, {
      data: dataArray
    });
  }


}
