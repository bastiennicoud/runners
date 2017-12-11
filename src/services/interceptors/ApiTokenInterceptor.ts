import {Inject, Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthStorage} from "../../storages/auth.storage";
import {API_ENDPOINT} from "../../tokens/api-endpoint";

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  constructor(@Inject(API_ENDPOINT) private base: string, private authStorage: AuthStorage){}
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req.clone({
      headers: req.headers.set('x-access-token', this.authStorage.key)
    });
    let r = authReq.clone({url: this.base + req.url});
    return next.handle(r);
  }
}
