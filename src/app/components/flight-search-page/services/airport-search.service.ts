import { Airport } from '../shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirportSearchService {

  apiUrl = 'http://localhost:8085/airport?query='

  constructor(private http: HttpClient) { }

  searchAirports(query: string) {
    return this.http.get<Airport[]>(this.apiUrl + query)
  }
}
