import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  URL = environment.FLIGHTS_API;

  constructor(private http: HttpClient) {}

  postUser(payload: any): any {
    const url = this.URL + '/auth/sign-up';
    return this.http.post(url, payload);
  }

  confirmUser(token: string): any {
    const url = this.URL + '/auth/confirm/' + token;
    return this.http.get(url);
  }
}
