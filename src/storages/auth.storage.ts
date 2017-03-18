import { Injectable } from '@angular/core';

import { User } from '../models/user';

/**
 * Store the key and the authenticated user
 * 
 * @export
 * @class AuthStorage
 */
@Injectable()
export class AuthStorage {

  private keyForKey = 'authToken';
  private keyForUser = 'user';


  /**
   * Get the user token (key)
   * @readonly
   * @type {string}
   * @memberOf AuthStorage
   */
  get key(): string | null {
    return localStorage.getItem(this.keyForKey);
  }

  set key(key: string | null) {
    localStorage.setItem(this.keyForKey, key);
  }
  /**
   * Get the authenticated user
   * @readonly
   * @type {User}
   * @memberOf AuthStorage
   */
  get user(): User | null {
    return User.build(JSON.parse(localStorage.getItem(this.keyForUser)));
  }

  set user(user: User | null) {
    localStorage.setItem(this.keyForUser, JSON.stringify(user));
  }

}
