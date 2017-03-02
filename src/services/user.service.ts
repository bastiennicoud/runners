import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { User } from '../models/user';
import { Runner } from '../models/runner';

export { User };


@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {}

  get(id: string): Observable<User> {
    return this.httpService
      .get(`/users/${id}`)
      .map(data => data.json())
      .map(data => User.build(data))
  }

  me(): Observable<User> {
    return this.get('me');
  }

  takeRunner({ id }: Runner): Observable<Runner> {
    return this.httpService
      .patch(`/users/me/runners/${id}/join`, null)
      .map(data => data.json())
      .map(data => Runner.build(data));
  }

}
