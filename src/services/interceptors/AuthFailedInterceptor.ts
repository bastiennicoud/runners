import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {AuthService} from "../auth.service";
// import {AuthService} from "../auth.service";

@Injectable()
export class AuthFailedInterceptor implements HttpInterceptor {
  private authService: AuthService;
  constructor(private inj: Injector){

  }
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.inj.get(AuthService);
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log(event.body)
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          this.authService.authFailed.next(err)
        }
      }
    });
  }
}
