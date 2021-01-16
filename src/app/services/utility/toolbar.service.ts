import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  navChange: EventEmitter<string> = new EventEmitter();
  toolbarTitle = 'Home';
  constructor() {
  }

  emitRouteChangeEvent(toolbarName: string): void {
    this.navChange.emit(toolbarName);
  }

  getNavChangeEmitter(): EventEmitter<string> {
    return this.navChange;
  }
}
