import { FlightMultihopModel } from '../models/flight';
import { Airport, TripType } from '../models/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FlightModel } from 'src/app/flight-booking/models/flight';
import { BehaviorSubject } from 'rxjs';
import {Flight} from '../models/flight';

export interface FlightRequest {
  originAirport: Airport;
  destinationAirport: Airport;
  passengers: number;
  tripType: TripType;
  departDate: Date | null;
  returnDate: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  URL = environment.FLIGHTS_API + '/flights';
  departureFlights = new BehaviorSubject<Flight[] | null>(null);
  returnFlights = new BehaviorSubject<Flight[] | null>(null);
  isRoundTrip = false;
  flightRequest: FlightRequest;

  constructor(private http: HttpClient) { }

  setIsRoundTrip(isRoundTrip: boolean): void {
    this.isRoundTrip = isRoundTrip;
  }

  getDepFlights(flightRequest: FlightRequest): void {
    this.flightRequest = flightRequest;
    const [origin, destination, departDate] = [
      flightRequest.originAirport.iataIdent,
      flightRequest.destinationAirport.iataIdent,
      flightRequest.departDate?.toLocaleDateString('en-CA'),
      flightRequest.returnDate?.toLocaleDateString('en-CA')
    ];

    this.http.get<FlightModel[]>(`${this.URL}?origin=${origin}&dest=${destination}&date=${departDate}`)
      .subscribe(flightModels => {
        const tempFlightsArray = flightModels.map(fltModel => {
          fltModel.departTime = new Date(fltModel.departTime);
          fltModel.arrivalTime = new Date(fltModel.arrivalTime);
          const flt = new Flight();
          flt.addLeg(fltModel);
          return flt;
        });
        this.departureFlights.next(tempFlightsArray);
      });

    this.http.get<FlightMultihopModel[]>(`${this.URL}/multihop?origin=${origin}&dest=${destination}&date=${departDate}`)
      .subscribe(multiFlightModel => {
        const tempFlightsArray = multiFlightModel.map(fltModel => {
          fltModel.leg1.departTime = new Date(fltModel.leg1.departTime);
          fltModel.leg1.arrivalTime = new Date(fltModel.leg1.arrivalTime);
          fltModel.leg2.departTime = new Date(fltModel.leg2.departTime);
          fltModel.leg2.arrivalTime = new Date(fltModel.leg2.arrivalTime);
          const flt = new Flight();
          flt.addLeg(fltModel.leg1);
          flt.addLeg(fltModel.leg2);
          return flt;
        });
        this.departureFlights.next(tempFlightsArray);
      });
  }

  getReturnFlts(): void {
    const [origin, destination, returnDate] = [
      this.flightRequest.originAirport.iataIdent,
      this.flightRequest.destinationAirport.iataIdent,
      this.flightRequest.departDate?.toLocaleDateString('en-CA'),
      this.flightRequest.returnDate?.toLocaleDateString('en-CA')
    ];
    if (!this.flightRequest) {
      throw new Error('no flt request defined for return trip');
    }

    this.http.get<FlightModel[]>(`${this.URL}?origin=${destination}&dest=${origin}&date=${returnDate}`)
        .subscribe(flightModels => {
          const tempFlightsArray = flightModels.map(fltModel => {
            fltModel.departTime = new Date(fltModel.departTime);
            fltModel.arrivalTime = new Date(fltModel.arrivalTime);
            const flt = new Flight();
            flt.addLeg(fltModel);
            return flt;
          });
          this.departureFlights.next(tempFlightsArray);
        });

    this.http.get<FlightMultihopModel[]>(`${this.URL}/multihop?origin=${destination}&dest=${origin}&date=${returnDate}`)
      .subscribe(multiFlightModel => {
        const tempFlightsArray = multiFlightModel.map(fltModel => {
          fltModel.leg1.departTime = new Date(fltModel.leg1.departTime);
          fltModel.leg1.arrivalTime = new Date(fltModel.leg1.arrivalTime);
          fltModel.leg2.departTime = new Date(fltModel.leg2.departTime);
          fltModel.leg2.arrivalTime = new Date(fltModel.leg2.arrivalTime);
          const flt = new Flight();
          flt.addLeg(fltModel.leg1);
          flt.addLeg(fltModel.leg2);
          return flt;
        });
        this.returnFlights.next(tempFlightsArray);
      });
  }
}
