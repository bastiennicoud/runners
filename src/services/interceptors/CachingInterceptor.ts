import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {CacheService} from "ionic-cache"
import {Observable} from 'rxjs/Observable';
import "rxjs/Rx"
import {AuthService} from "../auth.service";
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  /**
   * @var CacheService
   */
  private cache : CacheService;
  constructor(private injector: Injector){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // only cache get requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }


    this.cache = this.injector.get(CacheService)

    // This will be an Observable of the cached value if there is one,
    // or an empty Observable otherwise. It starts out empty.
    let maybeCachedResponse: Observable<HttpEvent<any>> = Observable.empty();


    // Check the cache.
    this.cache.getItem(req.url)
      .then((cachedResponse)=>{
        console.debug("getting from cache : "+req.url)
        console.debug(cachedResponse)

        if(cachedResponse && maybeCachedResponse.isEmpty())
          maybeCachedResponse = Observable.of(new HttpResponse(cachedResponse));
    })
    .catch(()=>{
      console.debug("No cache entry for : "+req.urlWithParams)
      this.cache.removeItem(req.url).catch(e => null)
    });


    // Create an Observable (but don't subscribe) that represents making
    // the network request and caching the value.
    const networkResponse = next.handle(req)
      .do(event => {
        // Just like before, check for the HttpResponse event and cache it.
        if (event instanceof HttpResponse) {
          this.cache.saveItem(req.url, event)
            .catch(err => console.log("Error saving "+req.url+" in cache\n"+err));
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err)
        //maybe status is 201, which is still an ok http response
        if (err.status >= 200 && err.status < 300) {
          const res = new HttpResponse({
            body: null,
            headers: err.headers,
            status: err.status,
            statusText: err.statusText,
            url: err.url
          });

          return Observable.of(res);
        } else {
          return Observable.throw(err);
        }
      });


    // Now, combine the two and send the cached response first (if there is
    // one), and the network response second.
    let maybeCachedButFromPromise = Observable.fromPromise(this.cache.getItem(req.url).catch(()=>null))
      .do(raw => console.debug("getting from cache : "+req.url))
      .filter(raw => raw !== null)
      .map(raw => new HttpResponse(raw))
      .catch(()=>null)


    return Observable.concat(maybeCachedButFromPromise, networkResponse  );
  }
}
