import { Http, Headers, RequestOptions, RequestOptionsArgs, Response, RequestMethod, Request } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { API_ENDPOINT } from '../tokens/api-endpoint';
import { AuthStorage } from '../storages/auth.storage';
import {CacheService} from "ionic-cache";
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";

// Widely inspirated by https://gist.github.com/chandermani/9166abe6e6608a31f471

export { Response, RequestOptionsArgs };

/**
 * This class add http header on each request.
 * And detect if the user have not sucessfully authenticated.
 *
 * @export
 * @class HttpService
 */
@Injectable()
export class HttpService {

  public authFailed: Subject<any> = new Subject<any>();

  constructor(@Inject(API_ENDPOINT) private base: string, private platform: Platform, private http: HttpClient, private authStorage: AuthStorage, private cache: CacheService) {}

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.request("GET", url, null, options);
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return this.request("POST", url, body, options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return this.request("PUT", url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.request("DELETE", url, null, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return this.request("PATCH", url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.request("HEAD", url, null, options);
  }
  private buildRequest(options: {
    body?: any;
    headers?: HttpHeaders;
    observe: 'events';
    params?: HttpParams;
    reportProgress?: boolean;
  }){
    return {
      ...options, headers : options.headers.append('x-access-token', this.authStorage.key)
    }
  }
  private request(method: string, url: string, body?: string, options?: RequestOptionsArgs): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append('x-access-token', this.authStorage.key)



    let r = new HttpRequest(method,  this.buildUrl(url), body, {headers});
    console.log("REQUEST");
    console.log(r)

    let response = this.http.request(r)
      .catch(err => {
        // If the user is not correctly authenticated.
        err.status == 401 && this.authFailed.next(err);

        return Observable.throw(err);
      });

    let cacheKey = method + url;

    // response
    //         .do(res => console.log(res))
    //
    //         .subscribe(r => console.log(r));

    // response.do(res => {
    //                   console.log("RESPONSE")
    //                   console.log(res)
    //                 })
    //                 .subscribe()
                    // .map(res => res.body)
    // return this.cache.loadFromObservable(cacheKey, request);
    // return Observable.create(observer => {
    //   console.log(observer)
    //   response.subscribe(d => observer.complete(d));
    //
    //
    // }).do(data => console.log(data));
    return response
  }

  private buildUrl(endpoint: string): string {
    return this.base + endpoint;
  }

}
