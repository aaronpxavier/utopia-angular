import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Response } from '../shared/models/api-response-types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceErrorHandler {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  handleError<T>(error: HttpErrorResponse, errorMessage: string): Observable <Response<T>> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else if (error.status === 401) {
      // jwt cookie is expired
      this.authService.setAuthenticated(false);
      this.router.navigate(['/login']);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of({ data: null, error: errorMessage });
  }
}
