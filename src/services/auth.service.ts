import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HttpService } from './http.service';
import { UserService, User } from './user.service';
import { AuthStorage } from '../storages/auth.storage';

/**
 * Mangage the authentication logic.
 * Allows the user to log in and log out.
 * 
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {

  public loggedOut: Subject<any> = new Subject<any>();

  constructor(private userService: UserService, private httpService: HttpService, private authStorage: AuthStorage) {
    // When httpService auth failed, disconnect user
    this.httpService.authFailed.subscribe(() => this.logout());
  }

/**
 * Log in the user
 * 
 * @param {string} key token user given by the administrator or qrcode.
 * @returns {Observable<User>}
 * 
 * @memberOf AuthService
 */
  login(key: string): Observable<User> {
    this.authStorage.key = key;

    return this.userService
      .me()
      .do(data => this.authStorage.user = User.build(data));
  }

/**
 * Log out the user and redirect automatically
 * @memberOf AuthService
 */
  logout(): void {
    this.authStorage.user = null;
    this.authStorage.key = null;
    this.redirect();
  }

  redirect(): void {
    this.loggedOut.next();
  }

  /**
   * The user is authenticated ?
   * @readonly
   * @type {boolean} return true if it is.
   * @memberOf AuthService
   */
  get isAuthenticated(): boolean {
    return !!this.authStorage.user;
  }

}
