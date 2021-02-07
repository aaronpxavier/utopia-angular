import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TravelerModel } from 'src/app/shared/models/types';

@Component({
  selector: 'app-traveler-info',
  templateUrl: './traveler-info.component.html',
  styleUrls: ['./traveler-info.component.scss']
})
export class TravelerInfoComponent implements OnInit {

  @Input() traveler: TravelerModel;

  constructor() { }

  ngOnInit(): void {
  }

}
