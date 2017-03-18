import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { User } from '../models/user';
import { Runner } from '../models/runner';

export { User };


/**
 * Lets you to retrieve one user or the authenticated user.
 * 
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {}

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
      .map(data => data.json())
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
    return this.get('me');
  }

/**
 * The authenticated user will join the run
 * 
 * @param {Runner} { id }
 * @returns {Observable<Runner>}
 * 
 * @memberOf UserService
 */
  takeRunner({ id }: Runner): Observable<Runner> {
    return this.httpService
      .patch(`/users/me/runners/${id}/join`, null)
      .map(data => data.json())
      .map(data => Runner.build(data));
  }

}
