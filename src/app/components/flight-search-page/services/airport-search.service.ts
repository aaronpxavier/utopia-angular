import { Airport } from '../shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportSearchService {

  apiUrl = 'http://localhost:8085/airport?query=';

  constructor(private http: HttpClient) { }

  searchAirports(query: string): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.apiUrl + query);
  }
}
