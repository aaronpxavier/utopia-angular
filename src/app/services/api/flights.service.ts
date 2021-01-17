import { FlightMultihopModel } from './../../shared/types';
import { Airport, TripType } from './../../components/flight-search-page/shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FlightModel } from 'src/app/shared/types';
import { BehaviorSubject } from 'rxjs';

export interface FlightRequest {
  originAirport: Airport,
  destinationAirport: Airport,
  passengers: number,
  tripType: TripType,
  departDate: Date | null,
  returnDate: Date | null
}

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  URL = environment.FLIGHTS_API + '/flights';

  directFlights = new BehaviorSubject<FlightModel[] | null>(null)
  directReturnFlights = new BehaviorSubject<FlightModel[] | null> (null)

  multihopFlights = new BehaviorSubject<FlightMultihopModel[] | null > (null)
  multihopReturnFlights = new BehaviorSubject<FlightMultihopModel[] | null>(null)

  constructor(private http: HttpClient) { }

  getFlights(flight: FlightRequest) {
    const [origin, destination, departDate, returnDate] = [
      flight.originAirport.iataIdent,
      flight.destinationAirport.iataIdent,
      flight.departDate?.toLocaleDateString('en-CA'),
      flight.returnDate?.toLocaleDateString('en-CA')
    ]
    this.http.get<FlightModel[]>(`${this.URL}?origin=${origin}&dest=${destination}&date=${departDate}`)
      .subscribe(flights => {
        this.directFlights.next(flights)
      })
    
    this.http.get<FlightMultihopModel[]>(`${this.URL}/multihop?origin=${origin}&dest=${destination}&date=${departDate}`)
      .subscribe(flights => {
        this.multihopFlights.next(flights)
      })
    
    if (flight.tripType === TripType.ROUND_TRIP) {
      this.http.get<FlightModel[]>(`${this.URL}?origin=${destination}&dest=${origin}&date=${returnDate}`)
        .subscribe(flights => {
          this.directReturnFlights.next(flights)
        })

      this.http.get<FlightMultihopModel[]>(`${this.URL}/multihop?origin=${destination}&dest=${origin}&date=${returnDate}`)
        .subscribe(flights => {
          this.multihopReturnFlights.next(flights)
        })
    }
  }
}
