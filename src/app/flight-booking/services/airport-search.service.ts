import { environment } from 'src/environments/environment';
import { Airport } from '../models/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportSearchService {

  API_URL =  environment.FLIGHTS_API + '/airport?query=';

  constructor(private http: HttpClient) { }

  searchAirports(query: string): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.API_URL + query.trim());
  }
}
