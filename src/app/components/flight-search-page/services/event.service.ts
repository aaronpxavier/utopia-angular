import { Airport, Location } from './../shared/types';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  airportSelected = new EventEmitter<{ airport: Airport, location: Location }>();

  emitAirportSelected(airport: Airport, location: Location): void {
    this.airportSelected.next({airport, location});
  }

  airportSelectedListener(): Observable<{airport: Airport, location: Location}> {
    return this.airportSelected.asObservable();
  }
}
