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
import {CacheProvider} from "../../providers/cache/cache";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  /**
   * @var CacheService
   */
  private cache : CacheService;
  private refreshor : CacheProvider;

  constructor(private injector: Injector){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // only cache get requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // this.refreshor = this.injector.get(CacheProvider);
    // this.cache = this.injector.get(CacheService)
    this.cache = this.injector.get(CacheProvider)

    // Create an Observable (but don't subscribe) that represents making
    // the network request and caching the value.
    const networkResponse = next.handle(req)
      .do(event => {
        // Just like before, check for the HttpResponse event and cache it.
        if (event instanceof HttpResponse) {
          this.cache.saveItem(req.url, event)
            // .then(()=>{
            //   this.refreshor.setLastRefresh(new Date());
            // })
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
      .do(raw => console.debug(raw))
      .filter(raw => raw !== null)
      .map(raw => new HttpResponse(raw))
      .catch(()=>null)
      .distinctUntilChanged()


    return Observable.concat(maybeCachedButFromPromise, networkResponse  );
  }
}
