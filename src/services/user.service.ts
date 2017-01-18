import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { BaseUrlService } from './base.url.service';
import { Platform } from 'ionic-angular';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class UserService extends BaseUrlService {
  constructor(public http: HttpService, public platform: Platform) {
    super(platform);
  }

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.BASE_URL}/users/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  me(): Observable<User> {
    return this.http.get(`${this.BASE_URL}/users/me`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data = res.json();
    return data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error("User service : ", error);
    return Observable.throw(errMsg);
  }
}
