import { Injectable, ErrorHandler } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subscriber, Operator, ObservableInput, OperatorFunction, ObservedValueOf } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  alertMessage: any;

  constructor(private errorHandler: ErrorHandler) { }
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(1),
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (error.message) {
          alert(error.message);
          return throwError(error.message);
        }
        else {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            var reader = new FileReader();

            reader.readAsText(error.error);

            reader.addEventListener('loadend', (e) => {
              debugger;
              this.alertMessage = reader.result;
              alert(JSON.parse(this.alertMessage).error);
              //console.log(text);
            });

            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          //console.log(errorMessage);
          return throwError(this.alertMessage);
        }
        
      })
    )
  }


}
