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

  constructor(private httpService: HttpClient) {}

/**
 * Get one user
 *
 * @param {string} id Unique identifier of the user.
 * @returns {Observable<User>}
 *
 * @memberOf UserService
 */
  get(id: string): Observable<User> {
    return this.httpService
      .get(`/users/${id}`)
      .map(data => User.build(data))
  }

/**
 * Get the authenticated user
 *
 * @returns {Observable<User>}
 *
 * @memberOf UserService
 */
  me(): Observable<User> {
  // this.httpService.get<any>("https://httpbin.org/").subscribe()

  return this.get('me');
  }

  myRuns() : Observable<Run[]>{
    return this.httpService.get<any[]>(`/me/runs`).map(runs => runs.map(r => Run.build(r)))
  }

  myWorkingHours() : Observable<Schedule[]>{
    return this.httpService.get<any[]>("/me/workinghours")
      .do(data => console.log(data))
      .map(data => data.map(i =>{
        console.log(i)
        return Schedule.build(i)}
        ))
      .do(data => console.log(data))
  }

}
