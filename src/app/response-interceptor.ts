import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap((evt) => {
        if (req.method !== 'GET' && evt instanceof HttpResponse) {
          if (evt.body && evt.body.message) {
            console.log(evt.body.message);
            alert(evt.body.message);
          }
        }
      }
      ),
      catchError((error: HttpErrorResponse) => {
        alert(error.error.message);
        return throwError(error);
      })
    );
  }
}
