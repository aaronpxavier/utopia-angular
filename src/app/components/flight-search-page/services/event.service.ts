import { Airport, Location } from './../shared/types';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  airportSelected = new EventEmitter<{ airport: Airport, location: Location }>()

  emitAirportSelected(airport: Airport, location: Location) {
    this.airportSelected.next({airport, location})
  }

  airportSelectedListener() {
    return this.airportSelected.asObservable()
  }
}
