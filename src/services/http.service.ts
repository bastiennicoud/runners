import { ConnectionBackend, Http, RequestOptions, Response, RequestOptionsArgs, Request, Headers } from "@angular/http";
import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export const X_ACCESS_TOKEN = 'x-access-token';

@Injectable()
export class HttpService extends Http {

  private accessDeniedOutObserver: any;
  public accessDeniedOut: Observable<any>;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);    
    this.accessDeniedOut = new Observable(observer => this.accessDeniedOutObserver = observer);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.request(url, this.appendAuthHeader(options));
    return this.execute(request);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.get(url, this.appendAuthHeader(options));
    return this.execute(request);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.post(url, body, this.appendAuthHeader(options));
    return this.execute(request);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.put(url, body, this.appendAuthHeader(options));
    return this.execute(request);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.delete(url, this.appendAuthHeader(options));
    return this.execute(request);
  }

  execute(request: Observable<Response>) {
    return new Observable<Response>(observer => {
      request.subscribe(response => {
        observer.next(response);
        observer.complete();
      }, error => {
        if (error.status == 401) {
          this.sendError();
          observer.error(error);
        } else {
          this.sendError();
          observer.error(error);
        }
      });
    });
  }

  sendError() {
    console.log("Error : ", this.accessDeniedOutObserver);
    if (this.accessDeniedOutObserver != null) {
      this.accessDeniedOutObserver.next();
    }
  }



  private appendAuthHeader(options?: RequestOptionsArgs): RequestOptionsArgs {
    let mergedOptions: RequestOptionsArgs;
    if (!options) {
      mergedOptions = { headers: new Headers() };
    } else {
      mergedOptions = options;
    }
    const token = localStorage.getItem(X_ACCESS_TOKEN);
    if (token) mergedOptions.headers.append(X_ACCESS_TOKEN, token);
    // JWT TOKEN
    /*const isTokenSet = mergedOptions.headers.has('Authorization');
     if (token && !isTokenSet) mergedOptions.headers.append('Authorization', `Bearer ${token}`);*/
    return mergedOptions;
  }
}
