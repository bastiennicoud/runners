import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import {HttpClient} from "@angular/common/http";
import "rxjs/Rx"
import {Run} from "../models/run";
import {Schedule} from "../models/schedule";
export { User };

/**
 * Lets you to retrieve one user or the authenticated user.
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get one user
   *
   * @param {string} id Unique identifier of the user.
   * @returns {Observable<User>}
   *
   * @memberOf UserService
   */
  get(id: string): Observable<User> {
    return this.httpClient.get(`/users/${id}`).map(data => User.build(data))
  }

  all(): Observable<User[]> {
    return this.httpClient
      .get<any[]>('/users')
      .map(data => data.map(user => User.build(user)))
  }

  /**
   * Get the authenticated user
   *
   * @returns {Observable<User>}
   *
   * @memberOf UserService
   */
  me(): Observable<User> {
    // this.httpClient.get<any>("https://httpbin.org/").subscribe()

    return this.httpClient
      .get('/me').last()
      .map(data => User.build(data))
  }

  myRuns() : Observable<Run[]>{
    return this.httpClient.get<any[]>(`/me/runs`).map(runs => runs.map(r => Run.build(r)))
  }

  myWorkingHours() : Observable<Schedule[]>{
    return this.httpClient.get<any[]>("/me/workinghours")
      .map(data => data.map(i => Schedule.build(i)))
  }
}
