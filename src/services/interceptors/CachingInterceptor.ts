import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {CacheService} from "ionic-cache"
import {Observable} from 'rxjs/Observable';
import {AuthService} from "../auth.service";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  /**
   * @var CacheService
   */
  private cache;
  constructor(private injector: Injector){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    this.cache = this.injector.get(CacheService)

    // This will be an Observable of the cached value if there is one,
    // or an empty Observable otherwise. It starts out empty.
    let maybeCachedResponse: Observable<HttpEvent<any>> = Observable.empty();

    // Check the cache.
    this.cache.getItem(req.urlWithParams).then((cachedResponse)=>{
      console.log("getting from cache")
        maybeCachedResponse = Observable.of(cachedResponse);
    })
      .catch(()=>{
        console.log("No cache entry for : "+req.urlWithParams)
      });


    // Create an Observable (but don't subscribe) that represents making
    // the network request and caching the value.
    const networkResponse = next.handle(req).do(event => {
      // Just like before, check for the HttpResponse event and cache it.
      if (event instanceof HttpResponse) {
        console.log("saving to cache")
        this.cache.saveItem(req.urlWithParams, event);
      }
    });

    // Now, combine the two and send the cached response first (if there is
    // one), and the network response second.
    return Observable.concat(maybeCachedResponse, networkResponse);
  }
}
