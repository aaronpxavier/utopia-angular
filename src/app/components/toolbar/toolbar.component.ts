import {AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit} from '@angular/core';
import { ToolbarService } from '../../services/utility/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements AfterContentChecked {

  toolbarTitle: string | undefined;
  constructor(private toolbarService: ToolbarService,
              private ref: ChangeDetectorRef) {
    this.toolbarService.getNavChangeEmitter().subscribe((title: string) => this.toolbarTitle = title);
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

}
