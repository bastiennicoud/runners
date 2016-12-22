import {Injectable} from '@angular/core';
import {Response, Http} from "@angular/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {HttpService} from "./http.service";

@Injectable()
export class UserService {
  constructor(public http: HttpService) {
  }

  getUser(id: string): Observable<User> {
    return null;
  }

  me(): Observable<User> {
    return this.http.get('/api/users/me')
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("response : ", res);
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
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
