import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.FLIGHTS_API;
  private authenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return this.authenticated.value;
  }

  isAuthenticated$(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  setAuthenticated(auth: boolean): void {
    this.authenticated.next(auth);
  }

  postUser(payload: any): Observable<any> {
    const url = this.URL + '/auth/sign-up';
    return this.http.post(url, payload);
  }

  confirmUser(token: string): Observable<any> {
    const url = this.URL + '/auth/confirm/' + token;
    return this.http.get(url);
  }

  loginUser(payload: any): Observable<any> {
    const url = this.URL + '/auth/login';
    return this.http.post(url, payload)
      .pipe(tap(_ => this.authenticated.next(true)));
  }

  logout(): Observable<any> {
    const url = this.URL + '/auth/logout';
    return this.http.post(url, null)
      .pipe(tap(_ => this.authenticated.next(false)),
        tap(_ => console.log('calling logout')));
  }
}
