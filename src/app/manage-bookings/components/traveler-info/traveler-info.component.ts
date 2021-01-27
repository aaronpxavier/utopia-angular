import { TravelerModel } from './../../models/booking-types';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-traveler-info',
  templateUrl: './traveler-info.component.html',
  styleUrls: ['./traveler-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TravelerInfoComponent implements OnInit {

  @Input() traveler: TravelerModel;

  constructor() { }

  ngOnInit(): void {
  }

}
