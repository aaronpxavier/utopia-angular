import { Airport, AirportType } from '../models/types';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportSelectionService {
  airportSelected = new EventEmitter<{ airport: Airport, airportType: AirportType }>();

  emitAirportSelected(airport: Airport, airportType: AirportType): void {
    this.airportSelected.next({airport, airportType});
  }

  airportSelectedListener(): Observable<{airport: Airport, airportType: AirportType}> {
    return this.airportSelected.asObservable();
  }
}
