import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HttpService } from './http.service';
import { UserService, User } from './user.service';
import { AuthStorage } from '../storages/auth.storage';

@Injectable()
export class AuthService {

  public loggedOut: Subject<any> = new Subject<any>();

  constructor(private userService: UserService, private httpService: HttpService, private authStorage: AuthStorage) {
    // When httpService auth failed, disconnect user
    this.httpService.authFailed.subscribe(() => this.logout());
  }

  login(key: string): Observable<User> {
    this.authStorage.key = key;

    return this.userService
      .me()
      .do(data => this.authStorage.user = User.build(data));
  }

  logout(): void {
    this.authStorage.user = null;
    this.authStorage.key = null;
    this.redirect();
  }

  redirect(): void {
    this.loggedOut.next();
  }

  get isAuthenticated(): boolean {
    return !!this.authStorage.user;
  }

}
