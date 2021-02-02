import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Response } from '../shared/models/api-response-types';

export function handleError<T>(error: HttpErrorResponse, errorMessage: string): Observable <Response<T>> {
  if (error.error instanceof ErrorEvent) {
  console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return of({ data: null, error: errorMessage });
}
