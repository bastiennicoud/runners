import { Http, Headers, RequestOptions, RequestOptionsArgs, Response, RequestMethod, Request } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';

import { API_ENDPOINT } from '../tokens/api-endpoint';
import { AuthStorage } from '../storages/auth.storage';

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

  constructor(@Inject(API_ENDPOINT) private base: string, private platform: Platform, private http: Http, private authStorage: AuthStorage) {}

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Get, url, null, options);
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Post, url, body, options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Put, url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Delete, url, null, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Patch, url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Head, url, null, options);
  }

  private request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
    let requestOptions = new RequestOptions(Object.assign({ method, body, url: this.buildUrl(url) }, options));

    if(!requestOptions.headers) requestOptions.headers = new Headers();

    requestOptions.headers.set('x-access-token', this.authStorage.key);
    requestOptions.headers.append('Content-Type', 'application/json');

    return this.http.request(new Request(requestOptions))
      .catch(err => {
        // If the user is not correctly authenticated.
        err.status == 401 && this.authFailed.next(err);
        return Observable.throw(err);
      })
  }

  private buildUrl(endpoint: string): string {
    return this.base + endpoint;
  }

}
