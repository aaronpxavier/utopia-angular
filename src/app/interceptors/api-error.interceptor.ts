import { Response } from 'src/app/shared/models/api-response-types';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  private errorMessage = '';

  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
      // .pipe(
      //   retry(1),
      //   catchError((error) => this.handleError(error, ''))
      // );
  }

  handleError(error: HttpErrorResponse, message: string): Observable<Response<any>> {
    // client side error
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError(this.errorMessage);
    } else {
      console.error(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of({ data: null, error: message });
  }
}
