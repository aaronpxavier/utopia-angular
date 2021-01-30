import { Airport } from '../models/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportSearchService {

  private readonly apiUrl = environment.FLIGHTS_API + '/airport?query=';

  constructor(private http: HttpClient) { }

  searchAirports(query: string): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.apiUrl + query.trim());
  }
}
