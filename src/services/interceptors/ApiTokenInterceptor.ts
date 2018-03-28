import { Inject, Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { AuthStorage } from '../../storages/auth.storage'
import { API_ENDPOINT } from '../../tokens/api-endpoint'
import { getApi } from '../../runners.getter'

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  constructor(
    @Inject(API_ENDPOINT) private base: string,
    private authStorage: AuthStorage
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authStorage.key}`).set('X-Requested-With', 'XMLHttpRequest'),
    })
    let u = req.url.startsWith('http') ? req.url : getApi() + req.url
    let r = authReq.clone({ url: u })
    return next.handle(r)
  }
}
